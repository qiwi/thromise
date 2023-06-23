const isFn = v => typeof v === 'function'

const isPromiseLike = v => isFn(v?.then) && isFn(v?.catch)

const marker = Symbol('thromise')

const _loop = (cb, ctx) => {
  const {stack, fns, resolve, reject} = ctx
  const thromisify = fn => {
    if (!isFn(fn)) {
      return fn
    }
    if (fns.has(fn)) {
      return fns.get(fn)
    }

    const _fn = (...args) => {
      if (stack.length > ctx.pos) {
        return stack[ctx.pos++]
      }

      const result = fn(...args)
      if (isPromiseLike(result)) {
        throw {
          marker,
          result,
        }
      }
      stack.push(result)
      ctx.pos++
      return result
    }
    fns.set(fn, _fn)

    return _fn
  }
  const t = (...args) => args.length > 1 ? args.map(thromisify) : thromisify(args[0])

  try {
    resolve(cb(t))
    stack.length = 0
  } catch (e) {
    if (e?.marker === marker) {
      e.result
        .then(r => {
          stack.push(r)
          ctx.pos = 0
          _loop(cb, ctx)
        })
        .catch(reject)
      return
    }

    reject(e)
  }
}

const loop = fn => new Promise((resolve, reject) =>
  _loop(fn, {stack: [], fns: new WeakMap(), pos: 0, resolve, reject})
)

module.exports = {
  loop
}
