// @flow
export const Sum = (value: number): {getType: Function, value: number, concat: Function} => ({
  getType: (): string => 'Sum',
  value,
  concat: (other: {getType: Function, value: number, concat: Function}): {getType: Function, value: number, concat: Function} => Sum(value + other.value)
})

export const All = (value: boolean): {getType: Function, value: boolean, concat: Function} => ({
  getType: (): string => 'All',
  value,
  concat: (other: {getType: Function, value: boolean, concat: Function}): {getType: Function, value: boolean, concat: Function} => All(value && other.value)
})

export const First = (value: string): {getType: Function, value: string, concat: Function} => ({
  getType: (): string => 'First',
  value,
  concat: (other: {getType: Function, value: string, concat: Function}): {getType: Function, value: string, concat: Function} => First(value)
})
