import {Throxy} from '../../main/ts'

describe('Throxy', () => {
  it('exposes proper default export', () => {
    expect(Throxy).toEqual(expect.any(Function))
  })

  const target = {
    foo: 'bar',
  }
  const throxy = new Throxy(target)

  describe('constructor', () => {
    it('return proper instance', () => {
      expect(throxy).toBeInstanceOf(Throxy)
      expect(throxy.target).toBe(target)
    })
  })

  describe('proto', () => {
    describe('getter', () => {
      it('returns target\'s value if exists', () => {
        expect(throxy.proxy.foo).toBe(target.foo)
      })

      it('returns proxy otherwise', () => {
        expect(throxy.proxy.bar).toBe(throxy.proxy)
        expect(throxy.proxy.bar.baz).toBe(throxy.proxy)
      })
    })
  })

  // describe('static', () => {})
})
