import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'chromaui-demo/e2e-demo-vitest',
		branch: 'main',
		test: 'ecosystem-ci',
		overrides: {
			'@chromatic-com/vitest': 'https://pkg.pr.new/@chromatic-com/vitest@main',
		},
	})
}
