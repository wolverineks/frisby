// const Either = Right || Left

export const Right = (x) => ({
  map: (f) => Right(f(x)), // normal map
  fold: (errorCb, happyCb) => happyCb(x), // run happy-path callback
  unBox: () => x
})

export const Left = (x) => ({
  map: (f) => Left(x), // no-op
  fold: (errorCb, happyCb) => errorCb(x), // run error callback
  unBox: () => x
})

export const findColor = (name) => {
  const colors = {red: 'rojo', green: 'verde', blue: 'azul'}
  const found = colors[name]
  return found ? Right(found) : Left(found)
}
