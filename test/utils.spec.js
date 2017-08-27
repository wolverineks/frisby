// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { fromNullable, tryCatch } from '../src/utils.js'

describe('fromNullable', function () {
  describe('when neither null or undefined', function () {
    it('should return a Right', function () {
      const expected = 'Right'
      const actual = fromNullable(true).type()

      expect(actual).to.equal(expected)
    })
  })

  describe('when null', function () {
    it('should return a Left', function () {
      const expected = 'Left'
      const actual = fromNullable(null).type()

      expect(actual).to.equal(expected)
    })
  })

  describe('when undefined', function () {
    it('should return a Left', function () {
      const expected = 'Left'
      const actual = fromNullable(undefined).type()

      expect(actual).to.equal(expected)
    })
  })
})

describe('tryCatch', function () {
  describe('on success', function () {
    it('should return a Right', function () {
      const successFunction = () => true
      const expected = 'Right'
      const actual = tryCatch(successFunction).type()

      expect(actual).to.equal(expected)
    })
  })

  describe('on error', function () {
    it('should return a Left', function () {
      const errorFunction = () => JSON.parse('{asdasd::}')
      const expected = 'Left'
      const actual = tryCatch(errorFunction).type()

      expect(actual).to.equal(expected)
    })
  })
})
