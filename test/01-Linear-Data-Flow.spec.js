import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as Linear from '../src/01-Linear-Data-Flow.js'
const {
  Box,
  nextCharForNumberString,
  trim,
  parse,
  increment,
  fromCharCode
} = Linear

describe('Box', function () {
  it('should be an object', function () {
    const box = Box(1)
    expect(box).to.be.an.instanceof(Object)
  })

  describe('map', function () {
    it('should have map method', function () {
      const box = Box(1)
      expect(box).to.have.respondTo('map')
    })

    it('should return a boxed version of the result of applying the given function to the state', function () {
      const box = Box(1)
      const expected = 2
      const addOne = (x) => { return x + 1 }
      const actual = box.map(addOne).unBox()

      expect(actual).to.equal(expected)
    })
  })

  describe('fold', function () {
    it('should have fold method', function () {
      const box = Box(1)
      expect(box).to.have.respondTo('fold')
    })

    it('should return the value after applying the given function', function () {
      const box = Box(1)
      const expected = 2
      const addOne = (x) => { return x + 1 }
      const actual = box.fold(addOne)

      expect(actual).to.equal(expected)
    })
  })

  describe('unBox', function () {
    it('should have unBox method', function () {
      const box = Box(1)
      expect(box).to.have.respondTo('unBox')
    })

    it('should return the value of the box', function () {
      const box = Box(1)
      const expected = 1
      const actual = box.unBox()

      expect(actual).to.equal(expected)
    })
  })

  describe('equals', function () {
    it('should have equals method', function () {
      const box = Box(1)
      expect(box).to.have.respondTo('equals')
    })

    describe('when unequal', function () {
      it('should compare the values of two boxes', function () {
        const boxOne = Box(1)
        const boxTwo = Box(2)
        const expected = false
        const actual = boxOne.equals(boxTwo)

        expect(actual).to.equal(expected)
      })
    })

    describe('when equal', function () {
      it('should compare the values of two boxes', function () {
        const boxOneA = Box(1)
        const boxOneB = Box(1)
        const expected = true
        const actual = boxOneA.equals(boxOneB)

        expect(actual).to.equal(expected)
      })
    })
  })
})

describe('nextCharForNumberString', function () {
  it('should return char given a string number', function () {
    const expected = 'A'
    const actual = nextCharForNumberString(' 64 ')

    expect(actual).to.equal(expected)
  })
})

describe('trim', function () {
  it('should trim leading and trailing spaces', function () {
    const expected = 'A'
    const actual = trim('  A  ')

    expect(actual).to.equal(expected)
  })
})

describe('parseInt', function () {
  it('should return number version of a string', function () {
    const expected = 12
    const actual = parse('12')

    expect(actual).to.equal(expected)
  })
})

describe('increment', function () {
  it('should return next integer', function () {
    const expected = 2
    const actual = increment(1)

    expect(actual).to.equal(expected)
  })
})

describe('fromCharCode', function () {
  it('should return character from integer', function () {
    const expected = 'A'
    const actual = fromCharCode('65')

    expect(actual).to.equal(expected)
  })
})
