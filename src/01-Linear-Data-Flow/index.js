export const Box = (x) => ({
  map: (f) => Box(f(x)),
  fold: (f) => f(x),
  unBox: () => x,
  equals: function (y) { return this.unBox() === y.unBox() }
})

// original
// export const nextCharForNumberString = (string) => {
//   const trimmed = string.trim()
//   const number = parseInt(trimmed)
//   const nextNumber = number + 1
//   return String.fromCharCode(nextNumber)
// }

export const nextCharForNumberString = (string) => {
  return Box(string)
    .map(trim)
    .map(parse)
    .map(increment)
    .map(fromCharCode)
    .unBox()
}

export const trim = (string) => string.trim()
export const parse = (string) => parseInt(string)
export const increment = (number) => number + 1
export const fromCharCode = (number) => String.fromCharCode(number)
