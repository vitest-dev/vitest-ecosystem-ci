import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'sapphi-red/vitest-github-actions-reporter',
		build: 'build',
		test: 'test',
	})
}
