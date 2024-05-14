import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'marko-js/examples',
		dir: 'library-ts',
		build: 'build',
		test: 'test',
	})
}
