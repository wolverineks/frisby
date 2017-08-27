// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Left } from '../../src/types/index.js'

describe('Left', function () {
  it('should be an object', function () {
    const left = Left(1)
    expect(left).to.be.an.instanceof(Object)
  })

  describe('type', function () {
    it('should have type method', function () {
      const left = Left(1)
      expect(left).to.have.respondTo('type')
    })

    it('should return the type of the object', function () {
      const left = Left(1)
      const expected = 'Left'
      const actual = left.type()

      expect(actual).to.equal(expected)
    })
  })

  describe('map', function () {
    it('should have map method', function () {
      const left = Left(1)
      expect(left).to.have.respondTo('map')
    })

    it('should return a Left without applying the given function to the state', function () {
      const left = Left(1)
      const expected = 1
      const addOne = (x) => x + 1
      const actual = left.map(addOne).unBox()

      expect(actual).to.equal(expected)
    })
  })

  describe('fold', function () {
    it('should have fold method', function () {
      const left = Left(1)
      expect(left).to.have.respondTo('fold')
    })

    it('should return the value after applying the first function', function () {
      const left = Left(1)
      const expected = 'error'
      const addOne = (x) => x + 1
      const error = () => expected
      const actual = left.fold(error, addOne)

      expect(actual).to.equal(expected)
    })
  })

  describe('unBox', function () {
    it('should have unBox method', function () {
      const left = Left(1)
      expect(left).to.have.respondTo('unBox')
    })

    it('should return the value of the left', function () {
      const left = Left(1)
      const expected = 1
      const actual = left.unBox()

      expect(actual).to.equal(expected)
    })
  })
})
