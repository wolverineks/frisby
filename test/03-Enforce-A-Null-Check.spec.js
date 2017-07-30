import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as Refactor from '../src/03-Enforce-A-Null-Check.js'
const { findColor } = Refactor

describe('findColor', function () {
  describe('when found', function () {
    it('should return Box version of the corresponding value', function () {
      const found = (string) => string.toUpperCase()
      const notFound = () => 'not found'
      const expected = 'ROJO'
      const actual = findColor('red').fold(notFound, found)

      expect(actual).to.equal(expected)
    })
  })

  describe('when not found', function () {
    it('should return the corresponding value', function () {
      const found = (string) => string.toUpperCase()
      const notFound = () => 'not found'
      const expected = 'not found'
      const actual = findColor('purple').fold(notFound, found)

      expect(actual).to.equal(expected)
    })
  })
})
