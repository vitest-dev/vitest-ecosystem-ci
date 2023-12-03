import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/test-utils',
		overrides: {
			'@vitejs/plugin-vue': true,
		},
		build: ['dev:prepare', 'prepack'],
		test: ['test:unit', 'test:examples'],
		beforeTest: ['pnpm playwright-core install chromium'],
	})
}
