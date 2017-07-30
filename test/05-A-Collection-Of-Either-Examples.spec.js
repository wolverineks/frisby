import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as Examples from '../src/05-A-Collection-Of-Either-Examples.js'
const { openSite, getPrefs } = Examples

describe('openSite', () => {
  describe('when user is logged in', function () {
    it('should return the login page', function () {
      const currentUser = { username: 'John123' }
      const expected = 'Hello John123'
      const actual = openSite(currentUser)

      expect(actual).to.equal(expected)
    })
  })

  describe('when user is not logged in', function () {
    it('should return the login page', function () {
      const currentUser = undefined
      const expected = 'Please login'
      const actual = openSite(currentUser)

      expect(actual).to.equal(expected)
    })
  })
})

describe('getPrefs', () => {
  describe('when user is premium', function () {
    it('should return user preferences', function () {
      const currentUser = { username: 'John123', premium: true, preferences: true }
      const expected = true
      const actual = getPrefs(currentUser)

      expect(actual).to.equal(expected)
    })
  })

  describe('when user is not premium', function () {
    it('should return the default preferences', function () {
      const currentUser = { username: 'John123', premium: undefined, preferences: true }
      const expected = 'DEFAULT_PREFERENCES'
      const actual = getPrefs(currentUser)

      expect(actual).to.equal(expected)
    })
  })
})
