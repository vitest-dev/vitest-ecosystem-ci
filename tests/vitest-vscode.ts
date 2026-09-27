import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-dev/vscode',
		build: 'ecosystem-ci:build',
		beforeTest: ['pnpm exec playwright install chromium'],
		test: 'ecosystem-ci:test',
	})
}
