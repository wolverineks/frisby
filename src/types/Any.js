// @flow
export const Any = (value: boolean): { value: boolean, concat: Function } => ({
  value,
  concat: (o: { value: boolean, concat: Function }) => Any(value || o.value)
})
Any.empty = () => Any(false)
