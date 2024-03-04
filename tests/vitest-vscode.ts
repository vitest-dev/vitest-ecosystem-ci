import { runInRepo, $ } from '../utils'
import { RunOptions } from '../types'
import process from 'node:process'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		build: 'compile',
		repo: 'vitest-dev/vscode',
		test: async () => {
			if (process.env.CI === 'true' && process.platform === 'linux') {
				await $`xvfb-run --auto-servernum --server-args='-screen\\ 0\\ 1024x768x24' pnpm test`
			} else {
				await $`pnpm test`
			}
		},

		// https://github.com/vitest-dev/vscode/pull/276
		// repo: 'hi-ogawa/vitest-vscode',
		// branch: 'test-vscode-e2e',
		// test: ['test', 'test-e2e'],
	})
}
