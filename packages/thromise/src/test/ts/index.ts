import {IAnyObject, IHandler, Throxy} from '../../main/ts'

describe('Throxy', () => {
  it('exposes proper default export', () => {
    expect(Throxy).toEqual(expect.any(Function))
  })

  const target = {
    foo: 'bar',
  }
  const handler: IHandler = (target: IAnyObject, name: string) => {

    if (name === 'bar') {
      return new Promise(resolve => {
        resolve('BAR')
      })
       .then(data => {
         target[name] = data
       })
    }
  }
  const throxy = new Throxy(target, handler)

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

      it('returns Thromise if value would be obtained by handler', done => {
        console.log(throxy.proxy.bar)

        expect(throxy.proxy.bar).toBeInstanceOf(Promise)

        throxy.proxy.bar.then(() => {
          expect(throxy.proxy.bar).toBe('BAR')
          done()
        })
      })

      it('returns undefined otherwise', () => {
        expect(throxy.proxy.baz).toBeUndefined()
      })
    })
  })

  // describe('static', () => {})
})
