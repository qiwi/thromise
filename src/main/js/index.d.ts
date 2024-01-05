type Fn = (...args: any) => any

type C = (t: (fn: Fn) => Fn) => any

export function loop<R extends Fn = C>(cb: C, ...rest: Fn[]): Promise<ReturnType<R>>
