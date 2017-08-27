// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Sum } from '../../src/types/index.js'

describe('Sum', function () {
  it('should be an object', function () {
    const sum = Sum(1)
    expect(sum).to.be.an.instanceof(Object)
  })

  describe('type', function () {
    it('should have type method', function () {
      const sum = Sum(1)
      expect(sum).to.have.respondTo('type')
    })

    it('should return a sum type', function () {
      const sum1 = Sum(1)
      const expected = 'Sum'
      const actual = sum1.type()

      expect(actual).to.equal(expected)
    })
  })

  describe('concat', function () {
    it('should have concat method', function () {
      const sum = Sum(1)
      expect(sum).to.have.respondTo('concat')
    })

    it('should return a sum type', function () {
      const sum1 = Sum(1)
      const sum2 = Sum(1)
      const expected = 'Sum'
      const actual = sum1.concat(sum2).type()

      expect(actual).to.equal(expected)
    })

    it('should return a sum with a value equal to the sum of the values of the two sums', function () {
      const sum1 = Sum(1)
      const sum2 = Sum(1)
      const expected = 2
      const actual = sum1.concat(sum2).value

      expect(actual).to.equal(expected)
    })

    describe('leading empty', function () {
      it('should return a sum type with original value', function () {
        const sum = Sum(1)
        const empty = Sum.empty()
        const expected = 1
        const actual = empty.concat(sum).value

        expect(actual).to.equal(expected)
      })
    })

    describe('trailing empty', function () {
      it('should return a sum type with original value', function () {
        const sum1 = Sum(1)
        const empty = Sum.empty()
        const expected = 1
        const actual = sum1.concat(empty).value

        expect(actual).to.equal(expected)
      })
    })
  })
})
