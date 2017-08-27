// @flow
import { fromNullable, tryCatch } from './utils.js'
import { Right, Left } from './types/index.js'
import fs from 'fs'

// export const openSite = (currentUser) => {
//   if (currentUser) {
//     return renderPage(currentUser)
//   } else {
//     return showLogin()
//   }
// }

export const openSite = (currentUser: { username: string } | void): string => {
  const showLogin = () => 'Please login'
  const renderPage = (currentUser: { username: string }) => `Hello ${currentUser.username}`

  return fromNullable(currentUser)
    .fold(showLogin, renderPage)
}

// export const getPrefs = (user) => {
//   if (user.premium) {
//     return user.preferences
//   } else {
//     return 'DEFAULT_PREFERENCES'
//   }
// }

export const getPrefs = (user: { preferences: string, premium: boolean | void }): string => {
  const getPremiumStatus = (user: { preferences: string, premium: boolean | void }): Right | Left => fromNullable(user.premium)
  const loadDefaultPrefs = () => 'DEFAULT_PREFERENCES'
  const loadUserPrefs = (user) => user.preferences

  return new Right(user)
    .chain(getPremiumStatus)
    .fold(loadDefaultPrefs, () => loadUserPrefs(user))
}

// export const getStreetName = (user) => {
//   const address = user.address
//
//   if (address) {
//     const street = address.street
//
//     if (street) {
//       return street.name
//     }
//   }
//   return 'no street'
// }

export const getStreetName = (user: { address: {} | void }): string => {
  const getAddress = (user) => fromNullable(user.address)
  const getStreet = (address) => fromNullable(address.street)
  const getName = (street) => street.name
  const onError = (_e) => 'no street'
  const onSuccess = (name) => name

  return new Right(user)
    .chain(getAddress)
    .chain(getStreet)
    .map(getName)
    .fold(onError, onSuccess)
}

// export const concatUniq = (x, ys) => {
//   const found = ys.filter(y => y===x)[0]
//   return foind ? ys : ys.concat(x)
// }

export const concatUniq = (x: number, ys: Array<number>): Array<number> => {
  const combine = (x, ys) => ys.concat(x)
  const returnOriginal = (ys) => ys

  return fromNullable(ys.filter(y => y === x)[0])
    .fold(() => combine(x, ys), () => returnOriginal(ys))
}

// export const wrapExample = (example: { previewPath?: string }): { previewPath?: string } => {
//   if (example.previewPath) {
//     try {
//       example.preview = fs.readFileSync(example.previewPath)
//     } catch (e) {
//       console.log(e)
//     }
//   }
//   return example
// }

export const wrapExample = (example: { previewPath?: string }): { previewPath?: string } => {
  const readFile = (filepath) => tryCatch(() => fs.readFileSync(filepath, 'utf-8'))
  const onError = () => example
  const onSuccess = (preview) => Object.assign({}, example, { preview })
  // const onSuccess = (preview) => { ...example, preview )

  return fromNullable(example.previewPath)
    .chain(readFile)
    .fold(onError, onSuccess)
}

// export const parseUrl = (config) => {
//   const urlRegEx = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
//   try {
//     const c = JSON.parse(config)
//     if (!c.url) return null
//     return c.url.match(urlRegEx)
//   } catch (e) {
//     return null
//   }
// }

export const parseUrl = (config: string): string | void => {
  const onError = () => null
  const onSuccess = (url) => url

  return tryCatch(() => JSON.parse(config))
    .chain((c) => fromNullable(c.url))
    .fold(onError, onSuccess)
}
