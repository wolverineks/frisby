// @flow
export const Max = (value: number): { value: number, concat: Function } => ({
  value,
  concat: (o: { value: number, concat: Function }) => Max(value > o.value ? value : o.value)
})
Max.empty = () => Max(-Infinity)
