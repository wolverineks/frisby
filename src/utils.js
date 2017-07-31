// @flow
export const Box = (x: any) => ({
  getType: () => 'Box',
  map: (f: (x) => any) => Box(f(x)),
  fold: (f: (x: any) => any) => f(x),
  unBox: () => x,
  equals: function (y: Box) { return this.unBox() === y.unBox() }
})

export const Right = (x: any) => ({
  getType: () => 'Right',
  chain: (f: (any) => any) => f(x),
  map: (f: (any) => any) => Right(f(x)), // normal map
  fold: (e: (any) => any, f: (any) => any) => f(x), // run happy-path callback
  unBox: () => x
})

export const Left = (x: any) => ({
  getType: () => 'Left',
  chain: (f: (any) => any) => Left(x), // no-op
  map: (f: (any) => any) => Left(x), // no-op
  fold: (e: (any) => any, f: (any) => any) => e(x), // run error callback
  unBox: () => x
})

export const fromNullable = (x: any): any => {
  return [undefined, null].includes(x) ? Left(x) : Right(x)
}

export const tryCatch = (f: () => any): Right | Left => {
  try {
    const result = f()
    return Right(result)
  } catch (e) {
    return Left(e)
  }
}
