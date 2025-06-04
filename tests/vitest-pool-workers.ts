import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'cloudflare/workers-sdk',
		test: 'pnpm test:ci -F @fixture/vitest-pool-workers',
	})
}
