import * as assert from 'node:assert'
import {describe, it} from 'node:test'
import {loop} from '../../main/js/index.mjs'

describe('thromise', () => {
  it('queues up async calls', (_, done) => {
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

  it('captures thrown exceptions', async () => {
    const s = v => v
    const f = e => { throw e }

    try {
      await loop((t) => {
        const [_s, _f] = t(s, f)

        _s('foo')
        _f('quxx')
        _s('bar')
        _f('baz')
      })
    } catch (e) {
      assert.equal(e, 'quxx')
    }
  })

  it('returns regular promise exceptions if any', async () => {
    const s = v => new Promise(resolve => setTimeout(() => resolve(v), Math.random() * 1000))
    const f = v => new Promise((_, reject) => setTimeout(() => reject(v), Math.random() * 1000))

    try {
      await loop((t) => {
        const [_s, _f] = t(s, f)

        _s('foo')
        _s('qux')
        _f('quxx')
        _s('bar')
        _f('baz')
      })
    } catch (e) {
      assert.ok(['quxx', 'baz'].includes(e))
    }
  })
})
