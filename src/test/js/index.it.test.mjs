import * as assert from 'node:assert'
import {describe, it} from 'node:test'
import {loop} from 'thromise'
import {createRequire} from 'node:module'

const require = createRequire(import.meta.url)
const {loop: _loop} = require('thromise')

describe('index', () => {
  const check = (loop, done) => {
    const a = (v, d) => new Promise((resolve, reject) => setTimeout(() => resolve(v), d))
    const b = v => v

    loop((t) => {
      const [_a, _b] = t(a, b)
      const results = [
        _a('foo', 100),
        _b('bar', 50),
        _a('baz', 50),
      ].join(',')

      assert.equal(results, 'foo,bar,baz')
      done()
    })
  }

  it('mjs entry works fine', (_, done) => check(loop, done))

  it('cjs works too', (_, done) => check(_loop, done))
})
