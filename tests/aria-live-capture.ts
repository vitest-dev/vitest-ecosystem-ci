import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'AriPerkkio/aria-live-capture',
		branch: 'master',
		build: 'build',
		test: 'test',
		beforeTest: ['pnpm exec playwright install'],
	})
}
