// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Right } from '../../src/types/index.js'

describe('Right', function () {
  it('should be an object', function () {
    const right = Right(1)
    expect(right).to.be.an.instanceof(Object)
  })

  describe('type', function () {
    it('should have type method', function () {
      const right = Right(1)
      expect(right).to.have.respondTo('type')
    })

    it('should return the type of the object', function () {
      const right = Right(1)
      const expected = 'Right'
      const actual = right.type()

      expect(actual).to.equal(expected)
    })
  })

  describe('map', function () {
    it('should have map method', function () {
      const right = Right(1)
      expect(right).to.have.respondTo('map')
    })

    it('should return a Right version of the result of applying the given function to the state', function () {
      const right = Right(1)
      const expected = 2
      const addOne = (x) => { return x + 1 }
      const actual = right.map(addOne).unBox()

      expect(actual).to.equal(expected)
    })
  })

  describe('fold', function () {
    it('should have fold method', function () {
      const right = Right(1)
      expect(right).to.have.respondTo('fold')
    })

    it('should return the value after applying the second function', function () {
      const x = 1
      const right = Right(x)
      const expected = x + 1
      const addOne = (x) => expected
      const error = () => 'error'
      const actual = right.fold(error, addOne)

      expect(actual).to.equal(expected)
    })
  })

  describe('unBox', function () {
    it('should have unBox method', function () {
      const right = Right(1)
      expect(right).to.have.respondTo('unBox')
    })

    it('should return the value of the right', function () {
      const right = Right(1)
      const expected = 1
      const actual = right.unBox()

      expect(actual).to.equal(expected)
    })
  })
})
