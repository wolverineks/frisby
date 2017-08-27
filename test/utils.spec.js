// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import {
  Any,
  All,
  Box,
  First,
  fromNullable,
  Left,
  Max,
  Min,
  Pair,
  Product,
  Right,
  Sum,
  tryCatch
} from '../src/utils.js'

describe('Any', function () {
  it('should return an Any type, true / false', function () {
    const anyTrue = Any(true)
    const anyFalse = Any(false)
    const expected = true
    const actual = anyTrue.concat(anyFalse).value

    expect(actual).to.equal(expected)
  })

  it('should return an Any type, false / true', function () {
    const anyFalse = Any(false)
    const anyTrue = Any(true)
    const expected = true
    const actual = anyFalse.concat(anyTrue).value

    expect(actual).to.equal(expected)
  })

  it('should return an Any type, true / true', function () {
    const anyTrue1 = Any(true)
    const anyTrue2 = Any(true)
    const expected = true
    const actual = anyTrue1.concat(anyTrue2).value

    expect(actual).to.equal(expected)
  })

  it('should return an Any type, false / false', function () {
    const anyFalse1 = Any(false)
    const anyFalse2 = Any(false)
    const expected = false
    const actual = anyFalse1.concat(anyFalse2).value

    expect(actual).to.equal(expected)
  })

  it('should return an Any type with the original value, trailing empty', function () {
    const anyTrue = Any(true)
    const empty = Any.empty()
    const expected = true
    const actual = anyTrue.concat(empty).value

    expect(actual).to.equal(expected)
  })

  it('should return an Any type with original value, leading empty', function () {
    const anyTrue = Any(false)
    const empty = Any.empty()
    const expected = false
    const actual = empty.concat(anyTrue).value

    expect(actual).to.equal(expected)
  })
})

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
})

describe('Box', function () {
  it('should be an object', function () {
    const box = Box(1)
    expect(box).to.be.an.instanceof(Object)
  })

  describe('type', function () {
    it('should have type method', function () {
      const box = Box(1)
      expect(box).to.have.respondTo('type')
    })

    it('should return the type of the object', function () {
      const box = Box(1)
      const expected = 'Box'
      const actual = box.type()

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

describe('fromNullable', function () {
  describe('when neither null or undefined', function () {
    it('should return a Right', function () {
      const expected = 'Right'
      const actual = fromNullable(true).type()

      expect(actual).to.equal(expected)
    })
  })

  describe('when null', function () {
    it('should return a Left', function () {
      const expected = 'Left'
      const actual = fromNullable(null).type()

      expect(actual).to.equal(expected)
    })
  })

  describe('when undefined', function () {
    it('should return a Left', function () {
      const expected = 'Left'
      const actual = fromNullable(undefined).type()

      expect(actual).to.equal(expected)
    })
  })
})

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

describe('Max', function () {
  it('should return an Max type, true / false', function () {
    const max = Max(10)
    const min = Max(1)
    const expected = 10
    const actual = max.concat(min).value

    expect(actual).to.equal(expected)
  })

  it('should return an Max type, false / true', function () {
    const min = Max(1)
    const max = Max(10)
    const expected = 10
    const actual = min.concat(max).value

    expect(actual).to.equal(expected)
  })

  it('should return an Max type, true / true', function () {
    const max1 = Max(10)
    const max2 = Max(10)
    const expected = 10
    const actual = max1.concat(max2).value

    expect(actual).to.equal(expected)
  })

  it('should return an Max type with the original value, trailing empty', function () {
    const max = Max(1)
    const empty = Max.empty()
    const expected = 1
    const actual = max.concat(empty).value

    expect(actual).to.equal(expected)
  })

  it('should return an Max type with original value, leading empty', function () {
    const max = Max(1)
    const empty = Max.empty()
    const expected = 1
    const actual = empty.concat(max).value

    expect(actual).to.equal(expected)
  })
})

describe('Min', function () {
  it('should return an Min type, true / false', function () {
    const max = Min(10)
    const min = Min(1)
    const expected = 1
    const actual = max.concat(min).value

    expect(actual).to.equal(expected)
  })

  it('should return an Min type, false / true', function () {
    const min = Min(1)
    const max = Min(10)
    const expected = 1
    const actual = min.concat(max).value

    expect(actual).to.equal(expected)
  })

  it('should return an Min type, true / true', function () {
    const max1 = Min(10)
    const max2 = Min(10)
    const expected = 10
    const actual = max1.concat(max2).value

    expect(actual).to.equal(expected)
  })

  it('should return an Min type with the original value, trailing empty', function () {
    const max = Min(1)
    const empty = Min.empty()
    const expected = 1
    const actual = max.concat(empty).value

    expect(actual).to.equal(expected)
  })

  it('should return an Min type with original value, leading empty', function () {
    const max = Min(1)
    const empty = Min.empty()
    const expected = 1
    const actual = empty.concat(max).value

    expect(actual).to.equal(expected)
  })
})

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

describe('Product', function () {
  it('should return a Product type with products of the two value', function () {
    const product3 = Product(3)
    const product5 = Product(5)
    const expected = 15
    const actual = product3.concat(product5).value

    expect(actual).to.equal(expected)
  })

  it('should return an Product type with the original value, trailing empty', function () {
    const product4 = Product(4)
    const empty = Product.empty()
    const expected = 4
    const actual = product4.concat(empty).value

    expect(actual).to.equal(expected)
  })

  it('should return a Product type with original value, leading empty', function () {
    const product7 = Product(7)
    const empty = Product.empty()
    const expected = 7
    const actual = empty.concat(product7).value

    expect(actual).to.equal(expected)
  })
})

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
  })
})

describe('tryCatch', function () {
  describe('on success', function () {
    it('should return a Right', function () {
      const successFunction = () => true
      const expected = 'Right'
      const actual = tryCatch(successFunction).type()

      expect(actual).to.equal(expected)
    })
  })

  describe('on error', function () {
    it('should return a Left', function () {
      const errorFunction = () => JSON.parse('{asdasd::}')
      const expected = 'Left'
      const actual = tryCatch(errorFunction).type()

      expect(actual).to.equal(expected)
    })
  })
})
