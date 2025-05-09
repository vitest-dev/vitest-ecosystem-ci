import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'stackblitz/webcontainer-test',
		branch: 'main',
		build: 'build',
		test: 'test',
		beforeTest:
			'npx playwright install chromium firefox --with-deps --only-shell',
	})
}
