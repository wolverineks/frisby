// @flow
export const Box = (x: any): {getType: Function, map: Function, fold: Function, unBox: Function} => ({
  getType: () => 'Box',
  map: (f: (x) => any) => Box(f(x)),
  fold: (f: (x: any) => any) => f(x),
  unBox: () => x,
  equals: function (y: Box) { return this.unBox() === y.unBox() }
})

export const Right = (x: any): {getType: Function, chain: Function, map: Function, fold: Function, unBox: Function} => ({
  getType: () => 'Right',
  chain: (f: (any) => any) => f(x),
  map: (f: (any) => any) => Right(f(x)), // normal map
  fold: (e: (any) => any, f: (any) => any) => f(x), // run happy-path callback
  unBox: () => x
})

export const Left = (x: any): {getType: Function, chain: Function, map: Function, fold: Function, unBox: Function} => ({
  getType: () => 'Left',
  chain: (f: (any) => any) => Left(x), // no-op
  map: (f: (any) => any) => Left(x), // no-op
  fold: (e: (any) => any, f: (any) => any) => e(x), // run error callback
  unBox: () => x
})

export const fromNullable = (x: any): {getType: Function, chain: Function, map: Function, fold: Function, unBox: Function} => {
  return [undefined, null].includes(x) ? Left(x) : Right(x)
}

export const tryCatch = (f: () => any): {getType: Function, chain: Function, map: Function, fold: Function, unBox: Function} => {
  try {
    const result = f()
    return Right(result)
  } catch (e) {
    return Left(e)
  }
}

export const Sum = (value: number): {getType: Function, value: number, concat: Function} => ({
  getType: (): string => 'Sum',
  value,
  concat: (other: {getType: Function, value: number, concat: Function}): {getType: Function, value: number, concat: Function} => {
    return Sum(value + other.value)
  }
})
Sum.empty = () => Sum(0)

export const All = (value: boolean): {getType: Function, value: boolean, concat: Function} => ({
  getType: (): string => 'All',
  value,
  concat: (other: {getType: Function, value: boolean, concat: Function}): {getType: Function, value: boolean, concat: Function} => All(value && other.value)
})
All.empty = () => All(true)

export const First = (value: string): {getType: Function, value: string, concat: Function} => ({
  getType: (): string => 'First',
  value,
  concat: (other: {getType: Function, value: string, concat: Function}): {getType: Function, value: string, concat: Function} => {
    return First(value)
  }
})
