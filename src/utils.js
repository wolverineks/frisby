export const Box = (x) => ({
  getType: () => 'Box',
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  unBox: () => x,
  equals: function (y) { return this.unBox() === y.unBox() }
})

export const Right = (x) => ({
  getType: () => 'Right',
  chain: (f) => f(x),
  map: (f) => Right(f(x)), // normal map
  fold: (e, f) => f(x), // run happy-path callback
  unBox: () => x
})

export const Left = (x) => ({
  getType: () => 'Left',
  chain: (f) => Left(x), // no-op
  map: (f) => Left(x), // no-op
  fold: (e, f) => e(x), // run error callback
  unBox: () => x
})

export const tryCatch = (f) => {
  try {
    const result = f()
    return Right(result)
  } catch (e) {
    return Left(e)
  }
}
