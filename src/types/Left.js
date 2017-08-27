// @flow
export const Left = (x: any): {type: Function, chain: Function, map: Function, fold: Function, unBox: Function} => ({
  type: () => 'Left',
  chain: (f: (any) => any) => Left(x), // no-op
  map: (f: (any) => any) => Left(x), // no-op
  fold: (e: (any) => any, f: (any) => any) => e(x), // run error callback
  unBox: () => x
})
