import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'vitejs/vite',
		build: 'build',
		test: 'test-unit',
	})
}
