// @flow
export const Box = (x: any): { type: Function, map: Function, fold: Function, unBox: Function, equals: Function} => ({
  type: () => 'Box',
  map: (f: (x: any) => any) => Box(f(x)),
  fold: (f: (x: any) => any) => f(x),
  unBox: () => x,
  equals: function (y: Box) { return this.unBox() === y.unBox() }
})
