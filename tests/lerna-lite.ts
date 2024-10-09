import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'lerna-lite/lerna-lite',
		test: 'pnpm test',
    build: 'build',
	})
}
