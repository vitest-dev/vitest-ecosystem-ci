import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'stackblitz/webcontainer-test',
		branch: 'chore/vitest-3.2.0',
		build: 'build',
		test: 'test',
		beforeTest:
			'npx playwright install chromium firefox --with-deps --only-shell',
	})
}
