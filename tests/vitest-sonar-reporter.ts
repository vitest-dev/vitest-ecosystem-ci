import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'AriPerkkio/vitest-sonar-reporter',
		build: 'build',
		test: 'test',
	})
}
