import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-tests/benchmark-large',
		test: 'vitest-ecosystem-ci:test',
	})
}
