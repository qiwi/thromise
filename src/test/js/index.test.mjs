import * as assert from 'node:assert'
import {describe, it} from 'node:test'
import {loop} from '../../main/js/index.mjs'

describe('thromise', () => {
  it('works', (_, done) => {
    const a = (v, d) => new Promise((resolve, reject) => setTimeout(() => resolve(v), d))
    const b = v => v

    loop((t) => {
      const [_a, _b] = t(a, b)
      const _c = t(b)
      const _d = t()

      const results = [
        _a('foo', 100),
        _b('qux'),
        _b('quxx'),
        _a('bar', 50),
        _a('baz', 50),
        _c('quuux')
      ].join(',')

      assert.equal(_d, undefined)
      assert.equal(results, 'foo,qux,quxx,bar,baz,quuux')

      done()
    })
  })
})
