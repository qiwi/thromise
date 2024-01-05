import { expectType, expectError } from 'tsd'
import { loop } from '../../..'

expectType<Promise<any>>(loop(() => 'foo'))
expectType<Promise<any>>(loop(async () => 'foo'))
expectType<Promise<'foo'>>(loop<() => 'foo'>(() => 'foo'))

expectError(loop('test'))
