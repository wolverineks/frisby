// @flow
export const Right = (x: any): {type: Function, chain: Function, map: Function, fold: Function, unBox: Function} => ({
  type: () => 'Right',
  chain: (f: (any) => any) => f(x),
  map: (f: (any) => any) => Right(f(x)), // normal map
  fold: (e: (any) => any, f: (any) => any) => f(x), // run happy-path callback
  unBox: () => x
})
