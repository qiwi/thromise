# thromise

[![CI](https://github.com/qiwi/thromise/actions/workflows/ci.yaml/badge.svg?branch=master)](https://github.com/qiwi/thromise/actions/workflows/ci.yaml)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b83e72f80c78f6ad1d8c/test_coverage)](https://codeclimate.com/github/qiwi/thromise/test_coverage)

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
 
_This is just our in-joke in the context of the Java vs JavaScript holywar_

## Install
```shell
yarn add thromise
```

## Usage
```js
import { loop } from 'thromise'

const a = (v) => new Promise(resolve => setTimeout(() => resolve(v), Math.random() * 1000))
const b = v => v

loop((t) => {
  const [_a, _b] = t(a, b)

  console.log(
    _a('foo'),
    _b('quz'),
    _a('bar'),
    _a('baz'),
  )
})
```

## License
[MIT](./LICENSE)
