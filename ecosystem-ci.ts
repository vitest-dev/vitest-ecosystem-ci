import fs from 'fs'
import path from 'path'
import process from 'process'
import { cac } from 'cac'

import {
	setupEnvironment,
	setupVitestRepo,
	buildVitest,
	bisectVitest,
	parseVitestMajor,
	parseMajorVersion,
} from './utils'
import { CommandOptions, RunOptions } from './types'

const cli = cac()
cli
	.command('[...suites]', 'build vitest and run selected suites')
	.option('--verify', 'verify checkouts by running tests', { default: false })
	.option('--repo <repo>', 'vitest repository to use', {
		default: 'vitest-dev/vitest',
	})
	.option('--branch <branch>', 'vitest branch to use', { default: 'main' })
	.option('--tag <tag>', 'vitest tag to use')
	.option('--commit <commit>', 'vitest commit sha to use')
	.option('--release <version>', 'vitest release to use from npm registry')
	.action(async (suites, options: CommandOptions) => {
		const { root, vitestPath, workspace } = await setupEnvironment()
		const suitesToRun = getSuitesToRun(suites, root)
		let vitestMajor
		if (!options.release) {
			await setupVitestRepo(options)
			await buildVitest({ verify: options.verify })
			vitestMajor = parseVitestMajor(vitestPath)
		} else {
			vitestMajor = parseMajorVersion(options.release)
		}
		const runOptions: RunOptions = {
			root,
			vitestPath,
			vitestMajor,
			workspace,
			release: options.release,
			verify: options.verify,
			skipGit: false,
		}
		for (const suite of suitesToRun) {
			await run(suite, runOptions)
		}
	})

cli
	.command('build-vitest', 'build vitest only')
	.option('--verify', 'verify vitest checkout by running tests', {
		default: false,
	})
	.option('--repo <repo>', 'vitest repository to use', {
		default: 'vitest-dev/vitest',
	})
	.option('--branch <branch>', 'vitest branch to use', { default: 'main' })
	.option('--tag <tag>', 'vitest tag to use')
	.option('--commit <commit>', 'vitest commit sha to use')
	.action(async (options: CommandOptions) => {
		await setupEnvironment()
		await setupVitestRepo(options)
		await buildVitest({ verify: options.verify })
	})

cli
	.command('run-suites [...suites]', 'run single suite with pre-built vitest')
	.option(
		'--verify',
		'verify checkout by running tests before using local vitest',
		{ default: false },
	)
	.option('--repo <repo>', 'vitest repository to use', {
		default: 'vitest-dev/vitest',
	})
	.option('--release <version>', 'vitest release to use from npm registry')
	.action(async (suites, options: CommandOptions) => {
		const { root, vitestPath, workspace } = await setupEnvironment()
		const suitesToRun = getSuitesToRun(suites, root)
		const runOptions: RunOptions = {
			...options,
			root,
			vitestPath,
			vitestMajor: parseVitestMajor(vitestPath),
			workspace,
		}
		for (const suite of suitesToRun) {
			await run(suite, runOptions)
		}
	})

cli
	.command(
		'bisect [...suites]',
		'use git bisect to find a commit in vitest that broke suites',
	)
	.option('--good <ref>', 'last known good ref, e.g. a previous tag. REQUIRED!')
	.option('--verify', 'verify checkouts by running tests', { default: false })
	.option('--repo <repo>', 'vitest repository to use', {
		default: 'vitest-dev/vitest',
	})
	.option('--branch <branch>', 'vitest branch to use', { default: 'main' })
	.option('--tag <tag>', 'vitest tag to use')
	.option('--commit <commit>', 'vitest commit sha to use')
	.action(async (suites, options: CommandOptions & { good: string }) => {
		if (!options.good) {
			console.log(
				'you have to specify a known good version with `--good <commit|tag>`',
			)
			process.exit(1)
		}
		const { root, vitestPath, workspace } = await setupEnvironment()
		const suitesToRun = getSuitesToRun(suites, root)
		let isFirstRun = true
		const { verify } = options
		const runSuite = async () => {
			try {
				await buildVitest({ verify: isFirstRun && verify })
				for (const suite of suitesToRun) {
					await run(suite, {
						verify: !!(isFirstRun && verify),
						skipGit: !isFirstRun,
						root,
						vitestPath,
						vitestMajor: parseVitestMajor(vitestPath),
						workspace,
					})
				}
				isFirstRun = false
				return null
			} catch (e) {
				return e
			}
		}
		await setupVitestRepo({ ...options, shallow: false })
		const initialError = await runSuite()
		if (initialError) {
			await bisectVitest(options.good, runSuite)
		} else {
			console.log(`no errors for starting commit, cannot bisect`)
		}
	})
cli.help()
cli.parse()

async function run(suite: string, options: RunOptions) {
	const { test } = await import(`./tests/${suite}.ts`)
	await test({
		...options,
		workspace: path.resolve(options.workspace, suite),
	})
}

function getSuitesToRun(suites: string[], root: string) {
	let suitesToRun: string[] = suites
	const availableSuites: string[] = fs
		.readdirSync(path.join(root, 'tests'))
		.filter((f: string) => !f.startsWith('_') && f.endsWith('.ts'))
		.map((f: string) => f.slice(0, -3))
	availableSuites.sort()
	if (suitesToRun.length === 0) {
		suitesToRun = availableSuites
	} else {
		const invalidSuites = suitesToRun.filter(
			(x) => !x.startsWith('_') && !availableSuites.includes(x),
		)
		if (invalidSuites.length) {
			console.log(`invalid suite(s): ${invalidSuites.join(', ')}`)
			console.log(`available suites: ${availableSuites.join(', ')}`)
			process.exit(1)
		}
	}
	return suitesToRun
}
