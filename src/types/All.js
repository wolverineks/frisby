// @flow
export const All = (value: boolean): { type: Function, value: boolean, concat: Function } => ({
  type: (): string => 'All',
  value,
  concat: (other: {type: Function, value: boolean, concat: Function}): {type: Function, value: boolean, concat: Function} =>
    All(value && other.value)
})
All.empty = () => All(true)
