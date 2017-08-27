// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { First } from '../../src/types/index.js'

describe('First', function () {
  it('should be an object', function () {
    const all = First('abc')
    expect(all).to.be.an.instanceof(Object)
  })

  describe('type', function () {
    it('should have type method', function () {
      const all = First('abc')
      expect(all).to.have.respondTo('type')
    })

    it('should return an all type', function () {
      const all = First('abc')
      const expected = 'First'
      const actual = all.type()

      expect(actual).to.equal(expected)
    })
  })

  describe('concat', function () {
    it('should have concat method', function () {
      const all = First('abc')
      expect(all).to.have.respondTo('concat')
    })

    it('should return an all type', function () {
      const all1 = First('abc')
      const all2 = First('abc')
      const expected = 'First'
      const actual = all1.concat(all2).type()

      expect(actual).to.equal(expected)
    })

    describe('when \'abc\' and \'def\'', function () {
      it('should return an all with a value of the first all', function () {
        const all1 = First('abc')
        const all2 = First('def')
        const expected = 'abc'
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })
  })
})
