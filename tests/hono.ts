import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		build: 'build',
		repo: 'honojs/middleware',
		test: 'test',
	})
}
