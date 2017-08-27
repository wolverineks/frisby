// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { All } from '../../src/types/index.js'

describe('All', function () {
  it('should be an object', function () {
    const all = All(true)
    expect(all).to.be.an.instanceof(Object)
  })

  describe('type', function () {
    it('should have type method', function () {
      const all = All(true)
      expect(all).to.have.respondTo('type')
    })

    it('should return an all type', function () {
      const all = All(true)
      const expected = 'All'
      const actual = all.type()

      expect(actual).to.equal(expected)
    })
  })

  describe('concat', function () {
    it('should have concat method', function () {
      const all = All(true)
      expect(all).to.have.respondTo('concat')
    })

    it('should return an all type', function () {
      const all1 = All(true)
      const all2 = All(true)
      const expected = 'All'
      const actual = all1.concat(all2).type()

      expect(actual).to.equal(expected)
    })

    describe('when true && true', function () {
      it('should return an all with a value equal to the all of the values of the two alls', function () {
        const all1 = All(true)
        const all2 = All(true)
        const expected = true
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })

    describe('when false && false', function () {
      it('should return an all with a value equal to the all of the values of the two alls', function () {
        const all1 = All(false)
        const all2 = All(false)
        const expected = false
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })

    describe('when true && false', function () {
      it('should return an all with a value equal to the all of the values of the two alls', function () {
        const all1 = All(true)
        const all2 = All(false)
        const expected = false
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })

    describe('when false && true', function () {
      it('should return an all with a value equal to the all of the values of the two alls', function () {
        const all1 = All(false)
        const all2 = All(true)
        const expected = false
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })
  })

  describe('when true and empty', function () {
    it('should return an All type with the original value, trailing empty', function () {
      const allTrue = All(true)
      const empty = All.empty()
      const expected = true
      const actual = allTrue.concat(empty).value

      expect(actual).to.equal(expected)
    })
  })

  describe('when false and empty', function () {
    it('should return an All type with original value, leading empty', function () {
      const allTrue = All(false)
      const empty = All.empty()
      const expected = false
      const actual = empty.concat(allTrue).value

      expect(actual).to.equal(expected)
    })
  })

  describe('when empty and true', function () {
    it('should return an All type with the original value, trailing empty', function () {
      const all = All(true)
      const empty = All.empty()
      const expected = true
      const actual = empty.concat(all).value

      expect(actual).to.equal(expected)
    })
  })

  describe('when empty and false', function () {
    it('should return an All type with original value, leading empty', function () {
      const all = All(false)
      const empty = All.empty()
      const expected = false
      const actual = empty.concat(all).value

      expect(actual).to.equal(expected)
    })
  })
})
