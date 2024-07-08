import { runInRepo } from '../utils'
import { RunOptions } from '../types'

export async function test(options: RunOptions) {
	await runInRepo({
		...options,
		repo: 'Effect-TS/effect',
		test: ['test --shard 1/3', 'test --shard 2/3', 'test --shard 3/3'],
	})
}
