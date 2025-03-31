import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'sveltejs/cli',
		build: 'build',
		test: 'pnpm exec vitest --project addons vitest',
	})
}
