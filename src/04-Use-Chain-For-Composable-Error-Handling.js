// @flow
import fs from 'fs'
import { tryCatch } from './utils.js'
import { Right } from './types/index.js'

// export const getPort = (filepath) => {
//   try {
//     const configString = fs.readFileSync(filepath)
//     const config = JSON.parse(configString)
//     const port = config.port
//     return port
//   } catch (e) {
//     return 3000
//   }
// }

export const getPort = (filepath: string): number => {
  const DEFAULT_PORT = 3000
  const readFile = () => tryCatch(() => fs.readFileSync(filepath))
  const parse = (configString) => tryCatch(() => JSON.parse(configString))
  const onSuccess = (config) => config.port
  const onError = (_error) => DEFAULT_PORT

  return new Right()
    .chain(readFile)
    .chain(parse)
    .fold(onError, onSuccess)
}
