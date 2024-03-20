import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		// repo: 'vitest-dev/vscode',
		repo: 'hi-ogawa/vitest-vscode',
		branch: 'test-ecosystem-ci',
		build: 'ecosystem-ci:build',
		test: 'ecosystem-ci:test',
	})
}
