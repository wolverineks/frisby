import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as Refactor from '../src/03-Enforce-A-Null-Check.js'
const {
  Right,
  Left,
  findColor
} = Refactor

describe('Right', () => {
  it('should be an object', () => {
    const box = Right(1)
    expect(box).to.be.an.instanceof(Object)
  })

  describe('map', () => {
    it('should have map method', () => {
      const box = Right(1)
      expect(box).to.have.respondTo('map')
    })

    it('should return a Right version of the result of applying the given function to the state', () => {
      const right = Right(1)
      const expected = 2
      const addOne = (x) => { return x + 1 }
      const actual = right.map(addOne).unBox()

      expect(actual).to.equal(expected)
    })
  })

  describe('fold', () => {
    it('should have fold method', () => {
      const right = Right(1)
      expect(right).to.have.respondTo('fold')
    })

    it('should return the value after applying the second function', () => {
      const x = 1
      const right = Right(x)
      const expected = x + 1
      const addOne = (x) => expected
      const error = () => 'error'
      const actual = right.fold(error, addOne)

      expect(actual).to.equal(expected)
    })
  })

  describe('unBox', () => {
    it('should have unBox method', () => {
      const right = Right(1)
      expect(right).to.have.respondTo('unBox')
    })

    it('should return the value of the right', () => {
      const right = Right(1)
      const expected = 1
      const actual = right.unBox()

      expect(actual).to.equal(expected)
    })
  })
})

describe('Left', () => {
  it('should be an object', () => {
    const box = Left(1)
    expect(box).to.be.an.instanceof(Object)
  })

  describe('map', () => {
    it('should have map method', () => {
      const box = Left(1)
      expect(box).to.have.respondTo('map')
    })

    it('should return a Left without applying the given function to the state', () => {
      const right = Left(1)
      const expected = 1
      const addOne = (x) => x + 1
      const actual = right.map(addOne).unBox()

      expect(actual).to.equal(expected)
    })
  })

  describe('fold', () => {
    it('should have fold method', () => {
      const right = Left(1)
      expect(right).to.have.respondTo('fold')
    })

    it('should return the value after applying the first function', () => {
      const right = Left(1)
      const expected = 'error'
      const addOne = (x) => x + 1
      const error = () => expected
      const actual = right.fold(error, addOne)

      expect(actual).to.equal(expected)
    })
  })

  describe('unBox', () => {
    it('should have unBox method', () => {
      const right = Left(1)
      expect(right).to.have.respondTo('unBox')
    })

    it('should return the value of the right', () => {
      const right = Left(1)
      const expected = 1
      const actual = right.unBox()

      expect(actual).to.equal(expected)
    })
  })
})

describe('findColor', () => {
  describe('when found', () => {
    it('should return Box version of the corresponding value', () => {
      const found = (string) => string.toUpperCase()
      const notFound = () => 'not found'
      const expected = 'ROJO'
      const actual = findColor('red').fold(notFound, found)

      expect(actual).to.equal(expected)
    })
  })

  describe('when not found', () => {
    it('should return the corresponding value', () => {
      const found = (string) => string.toUpperCase()
      const notFound = () => 'not found'
      const expected = 'not found'
      const actual = findColor('purple').fold(notFound, found)

      expect(actual).to.equal(expected)
    })
  })
})
