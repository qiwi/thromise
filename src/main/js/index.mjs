import {createRequire} from 'node:module'

export const loop = createRequire(import.meta.url)('./index.cjs').loop