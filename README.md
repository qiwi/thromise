# thromise

## Problem*

The Ugly.
```js
const a = fn('foo')
  .then(r => b(r, 'bar')
    .then(/* ... */))
```

The Bad.
```js
const a = await fn('foo')
const b = await fn(a, 'bar')
```

The good.
```js
loop(t => {
  const f = t(fn)
  
  const a = f('foo')
  const b = f(a, 'bar')
})
```
 
*_This is just our in-joke in the context of the Java vs JS holywar_

## Install
```shell
yarn add thromise
```

## Usage
```js
import { loop } from 'thromise'

const a = (v, d) => new Promise((resolve, reject) => setTimeout(() => resolve(v), d))
const b = v => v

loop((t) => {
  const [_a, _b] = t(a, b)
  console.log(
    _a('foo', 1000),
    _b('quz'),
    _a('bar', 500),
    _a('baz', 500),
  )
})
```

## License
[MIT](./LICENSE)
