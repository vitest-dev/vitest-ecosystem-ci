import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'marko-js/examples',
		dir: 'marko',
		test: 'pnpm --filter library-ts test',
		branch: 'master',
	})
}
