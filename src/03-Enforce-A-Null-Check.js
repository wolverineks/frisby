import { fromNullable } from './utils.js'

export const findColor = (name) => {
  const colors = {red: 'rojo', green: 'verde', blue: 'azul'}
  const found = colors[name]
  return fromNullable(found)
}
