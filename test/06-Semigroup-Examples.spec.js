import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Sum, All, First } from '../src/06-Semigroup-Examples.js'

describe('Sum', function () {
  it('should be an object', function () {
    const sum = Sum(1)
    expect(sum).to.be.an.instanceof(Object)
  })

  describe('getType', function () {
    it('should have getType method', function () {
      const sum = Sum(1)
      expect(sum).to.have.respondTo('getType')
    })

    it('should return a sum type', function () {
      const sum1 = Sum(1)
      const expected = 'Sum'
      const actual = sum1.getType()

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
      const actual = sum1.concat(sum2).getType()

      expect(actual).to.equal(expected)
    })

    it('should return a sum with a value equal to the sum of the values of the two sums', function () {
      const sum1 = Sum(1)
      const sum2 = Sum(1)
      const expected = 2
      const actual = sum1.concat(sum2).value

      expect(actual).to.equal(expected)
    })
  })
})

describe('All', function () {
  it('should be an object', function () {
    const all = All(1)
    expect(all).to.be.an.instanceof(Object)
  })

  describe('getType', function () {
    it('should have getType method', function () {
      const all = All(1)
      expect(all).to.have.respondTo('getType')
    })

    it('should return a all type', function () {
      const all = All(1)
      const expected = 'All'
      const actual = all.getType()

      expect(actual).to.equal(expected)
    })
  })

  describe('concat', function () {
    it('should have concat method', function () {
      const all = All(1)
      expect(all).to.have.respondTo('concat')
    })

    it('should return a all type', function () {
      const all1 = All(1)
      const all2 = All(1)
      const expected = 'All'
      const actual = all1.concat(all2).getType()

      expect(actual).to.equal(expected)
    })

    describe('when true && true', function () {
      it('should return a all with a value equal to the all of the values of the two alls', function () {
        const all1 = All(true)
        const all2 = All(true)
        const expected = true
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })

    describe('when false && false', function () {
      it('should return a all with a value equal to the all of the values of the two alls', function () {
        const all1 = All(false)
        const all2 = All(false)
        const expected = false
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })

    describe('when true && false', function () {
      it('should return a all with a value equal to the all of the values of the two alls', function () {
        const all1 = All(true)
        const all2 = All(false)
        const expected = false
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })

    describe('when false && true', function () {
      it('should return a all with a value equal to the all of the values of the two alls', function () {
        const all1 = All(false)
        const all2 = All(true)
        const expected = false
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })
  })
})

describe('First', function () {
  it('should be an object', function () {
    const all = First(1)
    expect(all).to.be.an.instanceof(Object)
  })

  describe('getType', function () {
    it('should have getType method', function () {
      const all = First(1)
      expect(all).to.have.respondTo('getType')
    })

    it('should return a all type', function () {
      const all = First(1)
      const expected = 'First'
      const actual = all.getType()

      expect(actual).to.equal(expected)
    })
  })

  describe('concat', function () {
    it('should have concat method', function () {
      const all = First(1)
      expect(all).to.have.respondTo('concat')
    })

    it('should return an all type', function () {
      const all1 = First(1)
      const all2 = First(1)
      const expected = 'First'
      const actual = all1.concat(all2).getType()

      expect(actual).to.equal(expected)
    })

    describe('when \'abc\' and \'def\'', function () {
      it('should return a all with a value of the first all', function () {
        const all1 = First('abc')
        const all2 = First('def')
        const expected = 'abc'
        const actual = all1.concat(all2).value

        expect(actual).to.equal(expected)
      })
    })
  })
})
