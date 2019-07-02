
type IAnyObject = {
  [key: string]: any
}

export class Throxy {

  proxy: any
  target: IAnyObject
  [key: string]: any

  constructor(target: IAnyObject) {

    const proxy: any = new Proxy(target, {
      get(target, name: any) {
        if (name in target) {
          return target[name]
        }

        Throxy.log('get', 'name=', name)

        return proxy
      },
    })

    this.target = target
    this.proxy = proxy
  }

  static log(...args: any[]): void {
    console.log('Throxy ', ...args)
  }

}

export class Thromise<T> extends Promise<T> {

  constructor(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void) {
    super(executor)
  }

}
