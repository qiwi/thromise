const isFn = v => typeof v === 'function'

const isPromiseLike = v => isFn(v?.then) && isFn(v?.catch)

const marker = Symbol('thromise')

const thromisify = (fn, ctx) => {
  const {fns, stack} = ctx
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

const _loop = async (cb, ctx) => {
  const {stack, rest, resolve, reject} = ctx
  const t = (...args) => args.length > 1 ? args.map(fn => thromisify(fn, ctx)) : thromisify(args[0], ctx)

  try {
    resolve(await cb(...rest, t))
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

const loop = (cb, ...rest) => new Promise((resolve, reject) => {
  const ctx = {stack: [], fns: new WeakMap(), pos: 0, resolve, reject}
  ctx.rest = rest.map(fn => thromisify(fn, ctx))

  _loop(cb, ctx)
})

module.exports = {
  loop
}
