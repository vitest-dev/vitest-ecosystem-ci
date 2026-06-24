import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'chromaui-demo/e2e-demo-vitest',
		branch: 'main',
		test: 'ecosystem-ci',
		beforeTest: ['pnpm exec playwright install chromium'],
	})
}
