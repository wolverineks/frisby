// @flow
import { Right, fromNullable } from './utils.js'

// export const openSite = (currentUser) => {
//   if (currentUser) {
//     return renderPage(currentUser)
//   } else {
//     return showLogin()
//   }
// }

export const openSite = (currentUser: {}) =>
  fromNullable(currentUser)
    .fold(showLogin, renderPage)
const showLogin = () => 'Please login'
const renderPage = (currentUser) => `Hello ${currentUser.username}`

// export const getPrefs = (user) => {
//   if (user.premium) {
//     return user.preferences
//   } else {
//     return 'DEFAULT_PREFERENCES'
//   }
// }

export const getPrefs = (user: { preferences: string }) =>
  new Right(user)
    .chain(getPremiumStatus)
    .fold(loadDefaultPrefs, () => loadUserPrefs(user))
const getPremiumStatus = (user) => fromNullable(user.premium)
const loadDefaultPrefs = () => 'DEFAULT_PREFERENCES'
const loadUserPrefs = (user) => user.preferences

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

export const getStreetName = (user: { address: {} }) =>
  new Right(user)
    .chain(getAddress)
    .chain(getStreet)
    .map(getName)
    .fold(onError, onSuccess)
const getAddress = (user) => fromNullable(user.address)
const getStreet = (address) => fromNullable(address.street)
const getName = (street) => street.name
const onError = (_e) => 'no street'
const onSuccess = (name) => name
