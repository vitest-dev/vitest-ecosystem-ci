import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'marko-js/examples',
		dir: 'examples/library-ts',
		test: 'test',
		branch: 'master',
	})
}
