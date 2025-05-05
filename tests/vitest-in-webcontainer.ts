import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitest-tests/vitest-in-webcontainer',
		branch: 'main',
		test: 'test',
		beforeTest:
			'npx playwright install chromium firefox --with-deps --only-shell',
	})
}
