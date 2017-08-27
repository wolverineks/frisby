// @flow
export const Pair = (x: Array<any>, y: Array<any>): { x: Array<any>, y: Array<any>, type: Function, concat: Function } => ({
  type: () => 'Pair',
  x,
  y,
  concat: ({x: x1, y: y1}: {x: Array<any>, y: Array<any>}) => Pair(x.concat(x1), y.concat(y1))
})
