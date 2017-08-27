// @flow
export const First = (value: string): {type: Function, value: string, concat: Function} => ({
  type: (): string => 'First',
  value,
  concat: (other: {type: Function, value: string, concat: Function}): {type: Function, value: string, concat: Function} => {
    return First(value)
  }
})
