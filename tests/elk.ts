import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'elk-zone/elk',
		test: 'test:unit:ci',
	})
}
