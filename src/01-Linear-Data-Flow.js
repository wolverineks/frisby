// @flow
import { Box } from './types/index.js'
// original
// export const nextCharForNumberString = (string) => {
//   const trimmed = string.trim()
//   const number = parseInt(trimmed)
//   const nextNumber = number + 1
//   return String.fromCharCode(nextNumber)
// }

export const nextCharForNumberString = (string: string): mixed => {
  return Box(string)
    .map(trim)
    .map(parse)
    .map(increment)
    .map(fromCharCode)
    .unBox()
}

export const trim = (string: string) => string.trim()
export const parse = (string: string) => parseInt(string)
export const increment = (number: number) => number + 1
export const fromCharCode = (number: number) => String.fromCharCode(number)
