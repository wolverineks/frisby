import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as Examples from '../src/05-A-Collection-Of-Either-Examples.js'
const { openSite, getPrefs, getStreetName } = Examples

describe('openSite', function () {
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

describe('getPrefs', function () {
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

describe('getStreetName', function () {
  describe('onError', function () {
    describe('when address is undefined', function () {
      it('should return \'no street\' message', function () {
        const user = { username: 'John', address: undefined }
        const expected = 'no street'
        const actual = getStreetName(user)

        expect(actual).to.equal(expected)
      })
    })

    describe('when street is undefined', function () {
      it('should return \'no street\' message', function () {
        const user = { username: 'John', address: { street: undefined } }
        const expected = 'no street'
        const actual = getStreetName(user)

        expect(actual).to.equal(expected)
      })
    })
  })

  describe('onSuccess', function () {
    it('should return the street name', function () {
      const user = {
        username: 'John',
        address: { street: { name: 'Main St.' } }
      }
      const expected = 'Main St.'
      const actual = getStreetName(user)

      expect(actual).to.equal(expected)
    })
  })
})
