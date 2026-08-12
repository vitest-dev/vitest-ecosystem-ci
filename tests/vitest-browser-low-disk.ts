import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-tests/browser-examples',
		test: 'ecosystem-ci:test:low-disk',
		beforeTest: [
			'pnpm playwright install chromium',
			'ecosystem-ci:before-test:low-disk',
		],
	})
}
