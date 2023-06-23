type C = (t: (fn: Function) => Function) => any

declare function loop<R extends C = C>(cb: C): Promise<ReturnType<R>>
