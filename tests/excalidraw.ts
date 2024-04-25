import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		branch: 'master',
		repo: 'excalidraw/excalidraw',
		test: 'test:app',
	})
}
