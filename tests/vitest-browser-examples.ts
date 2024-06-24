import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-tests/browser-examples',
		test: 'test',
		beforeTest: ['pnpm playwright install chromium'],
	})
}
