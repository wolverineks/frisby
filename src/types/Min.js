// @flow
export const Min = (value: number): { value: number, concat: Function } => ({
  value,
  concat: (o: { value: number, concat: Function }) => Min(value < o.value ? value : o.value)
})
Min.empty = () => Min(Infinity)
