import { runInRepo } from '../utils'
import { RunOptions } from '../types'

// npx tsx ecosystem-ci.ts vitest-vscode --release 1.3.1

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		build: 'compile',
		repo: 'vitest-dev/vscode',
		test: 'test',

		// https://github.com/vitest-dev/vscode/pull/276
		// repo: 'hi-ogawa/vitest-vscode',
		// branch: 'test-vscode-e2e',
		// test: ['test', 'test-e2e'],
	})
}
