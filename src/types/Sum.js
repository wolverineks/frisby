// @flow
export const Sum = (value: number): {type: Function, value: number, concat: Function} => ({
  type: (): string => 'Sum',
  value,
  concat: (other: {type: Function, value: number, concat: Function}): {type: Function, value: number, concat: Function} => {
    return Sum(value + other.value)
  }
})
Sum.empty = () => Sum(0)
