// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Pair } from '../../src/types/index.js'

describe('Pair', function () {
  it('should be an object', function () {
    const pair = Pair([1], [2])
    expect(pair).to.be.an.instanceof(Object)
  })

  describe('type', function () {
    it('should have type method', function () {
      const pair = Pair([1], [2])
      expect(pair).to.have.respondTo('type')
    })

    it('should return a pair type', function () {
      const pair = Pair([1], [2])
      const expected = 'Pair'
      const actual = pair.type()

      expect(actual).to.equal(expected)
    })
  })

  describe('concat', function () {
    it('should have concat method', function () {
      const pair = Pair([1], [2])
      expect(pair).to.have.respondTo('concat')
    })

    it('should return a pair type', function () {
      const pair1 = Pair([1], [2])
      const pair2 = Pair([3], [4])
      const expected = 'Pair'
      const actual = pair1.concat(pair2).type()

      expect(actual).to.equal(expected)
    })

    it('should return a pair with an x equal to the concating of the xs of the two pairs', function () {
      const pair1 = Pair([1], [2])
      const pair2 = Pair([3], [4])
      const expected = [1, 3]
      const actual = pair1.concat(pair2).x

      expect(actual).to.eql(expected)
    })

    it('should return a pair with an y equal to the concating of the ys of the two pairs', function () {
      const pair1 = Pair([1], [2])
      const pair2 = Pair([3], [4])
      const expected = [2, 4]
      const actual = pair1.concat(pair2).y

      expect(actual).to.eql(expected)
    })
  })
})
