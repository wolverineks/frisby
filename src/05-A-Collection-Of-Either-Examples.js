import { fromNullable } from './utils.js'

// export const openSite = (currentUser) => {
//   if (currentUser) {
//     return renderPage(currentUser)
//   } else {
//     return showLogin()
//   }
// }

export const openSite = (currentUser) =>
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

export const getPrefs = (user) =>
  fromNullable(user.premium)
    .fold(loadDefaultPrefs, () => loadUserPrefs(user))

const loadDefaultPrefs = () => 'DEFAULT_PREFERENCES'
const loadUserPrefs = (user) => user.preferences
