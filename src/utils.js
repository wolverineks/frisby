// @flow
import { Left, Right } from './types/index.js'

export const fromNullable = (x: any): {type: Function, chain: Function, map: Function, fold: Function, unBox: Function} => {
  return [undefined, null].includes(x) ? Left(x) : Right(x)
}

export const tryCatch = (f: () => any): {type: Function, chain: Function, map: Function, fold: Function, unBox: Function} => {
  try {
    const result = f()
    return Right(result)
  } catch (e) {
    return Left(e)
  }
}
