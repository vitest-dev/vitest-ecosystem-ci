import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-tests/reporters-large',
		beforeTest: ['pnpm cpu-profile'],
		test: 'test',
	})
}
