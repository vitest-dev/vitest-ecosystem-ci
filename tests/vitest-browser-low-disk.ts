import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-tests/browser-examples',
		test: 'test:low-disk',
		beforeTest: [
			'pnpm playwright install chromium',
			'test:low-disk:before-test 2',
		],
	})
}
