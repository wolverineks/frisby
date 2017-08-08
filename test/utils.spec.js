import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Box, Left, Right, fromNullable, tryCatch, Sum, All, First } from '../src/utils.js'

describe('Box', function () {
  it('should be an object', function () {
    const box = Box(1)
    expect(box).to.be.an.instanceof(Object)
  })

  describe('getType', function () {
    it('should have getType method', function () {
      const box = Box(1)
      expect(box).to.have.respondTo('getType')
    })

    it('should return the type of the object', function () {
      const box = Box(1)
      const expected = 'Box'
      const actual = box.getType()

      expect(actual).to.equal(expected)
    })
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

describe('Right', function () {
  it('should be an object', function () {
    const right = Right(1)
    expect(right).to.be.an.instanceof(Object)
  })

  describe('getType', function () {
    it('should have getType method', function () {
      const right = Right(1)
      expect(right).to.have.respondTo('getType')
    })

    it('should return the type of the object', function () {
      const right = Right(1)
      const expected = 'Right'
      const actual = right.getType()

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

describe('Left', function () {
  it('should be an object', function () {
    const left = Left(1)
    expect(left).to.be.an.instanceof(Object)
  })

  describe('getType', function () {
    it('should have getType method', function () {
      const left = Right(1)
      expect(left).to.have.respondTo('getType')
    })

    it('should return the type of the object', function () {
      const left = Right(1)
      const expected = 'Right'
      const actual = left.getType()

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

describe('fromNullable', function () {
  describe('when neither null or undefined', function () {
    it('should return a Right', function () {
      const expected = 'Right'
      const actual = fromNullable(true).getType()

      expect(actual).to.equal(expected)
    })
  })

  describe('when null', function () {
    it('should return a Left', function () {
      const expected = 'Left'
      const actual = fromNullable(null).getType()

      expect(actual).to.equal(expected)
    })
  })

  describe('when undefined', function () {
    it('should return a Left', function () {
      const expected = 'Left'
      const actual = fromNullable(undefined).getType()

      expect(actual).to.equal(expected)
    })
  })
})

describe('tryCatch', function () {
  describe('on success', function () {
    it('should return a Right', function () {
      const successFunction = () => true
      const expected = 'Right'
      const actual = tryCatch(successFunction).getType()

      expect(actual).to.equal(expected)
    })
  })

  describe('on error', function () {
    it('should return a Left', function () {
      const errorFunction = () => JSON.parse('{asdasd::}')
      const expected = 'Left'
      const actual = tryCatch(errorFunction).getType()

      expect(actual).to.equal(expected)
    })
  })
})

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
