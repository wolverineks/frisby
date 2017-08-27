// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as Examples from '../src/05-A-Collection-Of-Either-Examples.js'
const { openSite, getPrefs, getStreetName, concatUniq, wrapExample, parseUrl } = Examples

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
      const currentUser = { username: 'John123', premium: true, preferences: 'user preferences' }
      const expected = 'user preferences'
      const actual = getPrefs(currentUser)

      expect(actual).to.equal(expected)
    })
  })

  describe('when user is not premium', function () {
    it('should return the default preferences', function () {
      const currentUser = { username: 'John123', premium: undefined, preferences: 'user preferences' }
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

describe('concatUniq', function () {
  describe('onError', function () {
    describe('when item is already in the array', function () {
      it('should return the array', function () {
        const array = [1, 2, 3, 4, 5]
        const item = 3
        const expected = [1, 2, 3, 4, 5]
        const actual = concatUniq(item, array)

        expect(actual).to.deep.equal(expected)
      })
    })
  })

  describe('onSuccess', function () {
    describe('when item is not already in the array', function () {
      it('should return the array with the item in it', function () {
        const array = [1, 2, 3, 4, 5]
        const item = 6
        const expected = [1, 2, 3, 4, 5, 6]
        const actual = concatUniq(item, array)

        expect(actual).to.deep.equal(expected)
      })
    })
  })
})

describe('wrapExample', function () {
  describe('onError', function () {
    describe('when previewPath is undefined', function () {
      it('should return the example', function () {
        const example = {a: 1, b: 2, c: 3}
        const expected = example
        const actual = wrapExample(example)

        expect(actual).to.deep.equal(expected)
      })
    })

    describe('when reading the file errors', function () {
      it('should return the example', function () {
        const example = {a: 1, b: 2, c: 3, previewPath: 'non-existent-file.txt'}
        const expected = example
        const actual = wrapExample(example)

        expect(actual).to.deep.equal(expected)
      })
    })
  })

  describe('onSuccess', function () {
    it('should return the example with the preview in it', function () {
      const example = {a: 1, b: 2, c: 3, previewPath: 'test/preview.txt', preview: 'qwertyuiop\n'}
      const expected = example
      const actual = wrapExample(example)

      expect(actual).to.deep.equal(expected)
    })
  })
})

describe('parseUrl', function () {
  describe('onError', function () {
    describe('when parse fails', function () {
      it('should return null', function () {
        const config = '{::}'
        const expected = null
        const actual = parseUrl(config)

        expect(actual).to.equal(expected)
      })
    })
    describe('when url is undefined', function () {
      it('should return null', function () {
        const config = '{}'
        const expected = null
        const actual = parseUrl(config)

        expect(actual).to.equal(expected)
      })
    })
  })

  describe('onSuccess', function () {
    it('should return the url', function () {
      const config = '{"url": "www.example.com"}'
      const expected = 'www.example.com'
      const actual = parseUrl(config)

      expect(actual).to.equal(expected)
    })
  })
})
