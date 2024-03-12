import { runInRepo, $ } from '../utils'
import { RunOptions } from '../types'
import process from 'node:process'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-dev/vscode',
		build: 'compile',
		test: async () => {
			if (process.env.CI === 'true' && process.platform === 'linux') {
				await $`xvfb-run --auto-servernum --server-args=-screen\\ 0\\ 1024x768x24 pnpm test`
				await $`xvfb-run --auto-servernum --server-args=-screen\\ 0\\ 1024x768x24 pnpm test-e2e --retry 2`
			} else {
				await $`pnpm test`
				await $`pnpm test-e2e`
			}
		},
	})
}
