import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-tests/browser-examples',
		test: 'test:disk-pressure',
		beforeTest: [
			'pnpm playwright install chromium',
			'test:disk-pressure:before-test 2',
		],
	})
}
