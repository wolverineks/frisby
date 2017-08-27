// @flow
export const Product = (value: number) => ({
  value,
  concat: (o: {value: number}) => {
    return Product(value * o.value)
  }
})
Product.empty = () => Product(1)
