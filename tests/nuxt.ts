import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'nuxt/nuxt',
		overrides: {
			'@vitejs/plugin-vue': true,
		},
		build: 'build',
		test: ['test:fixtures', 'test:unit'],
	})
}
