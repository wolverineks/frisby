// @flow
export const Any = (value: boolean): { value: boolean, concat: Function } => ({
  value,
  concat: (o: { value: boolean, concat: Function }) => Any(value || o.value)
})
Any.empty = () => Any(false)

export const All = (value: boolean): { type: Function, value: boolean, concat: Function } => ({
  type: (): string => 'All',
  value,
  concat: (other: {type: Function, value: boolean, concat: Function}): {type: Function, value: boolean, concat: Function} =>
    All(value && other.value)
})
All.empty = () => All(true)

export const Box = (x: any): { type: Function, map: Function, fold: Function, unBox: Function, equals: Function} => ({
  type: () => 'Box',
  map: (f: (x: any) => any) => Box(f(x)),
  fold: (f: (x: any) => any) => f(x),
  unBox: () => x,
  equals: function (y: Box) { return this.unBox() === y.unBox() }
})

export const First = (value: string): {type: Function, value: string, concat: Function} => ({
  type: (): string => 'First',
  value,
  concat: (other: {type: Function, value: string, concat: Function}): {type: Function, value: string, concat: Function} => {
    return First(value)
  }
})

export const fromNullable = (x: any): {type: Function, chain: Function, map: Function, fold: Function, unBox: Function} => {
  return [undefined, null].includes(x) ? Left(x) : Right(x)
}

export const Left = (x: any): {type: Function, chain: Function, map: Function, fold: Function, unBox: Function} => ({
  type: () => 'Left',
  chain: (f: (any) => any) => Left(x), // no-op
  map: (f: (any) => any) => Left(x), // no-op
  fold: (e: (any) => any, f: (any) => any) => e(x), // run error callback
  unBox: () => x
})

export const Max = (value: number): { value: number, concat: Function } => ({
  value,
  concat: (o: { value: number, concat: Function }) => Max(value > o.value ? value : o.value)
})
Max.empty = () => Max(-Infinity)

export const Min = (value: number): { value: number, concat: Function } => ({
  value,
  concat: (o: { value: number, concat: Function }) => Min(value < o.value ? value : o.value)
})
Min.empty = () => Min(Infinity)

export const Pair = (x: Array<any>, y: Array<any>): { x: Array<any>, y: Array<any>, type: Function, concat: Function } => ({
  type: () => 'Pair',
  x,
  y,
  concat: ({x: x1, y: y1}: {x: Array<any>, y: Array<any>}) => Pair(x.concat(x1), y.concat(y1))
})

export const Product = (value: number) => ({
  value,
  concat: (o: {value: number}) => {
    return Product(value * o.value)
  }
})
Product.empty = () => Product(1)

export const Right = (x: any): {type: Function, chain: Function, map: Function, fold: Function, unBox: Function} => ({
  type: () => 'Right',
  chain: (f: (any) => any) => f(x),
  map: (f: (any) => any) => Right(f(x)), // normal map
  fold: (e: (any) => any, f: (any) => any) => f(x), // run happy-path callback
  unBox: () => x
})

export const Sum = (value: number): {type: Function, value: number, concat: Function} => ({
  type: (): string => 'Sum',
  value,
  concat: (other: {type: Function, value: number, concat: Function}): {type: Function, value: number, concat: Function} => {
    return Sum(value + other.value)
  }
})
Sum.empty = () => Sum(0)

export const tryCatch = (f: () => any): {type: Function, chain: Function, map: Function, fold: Function, unBox: Function} => {
  try {
    const result = f()
    return Right(result)
  } catch (e) {
    return Left(e)
  }
}
