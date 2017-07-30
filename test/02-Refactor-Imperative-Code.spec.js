import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as Refactor from '../src/02-Refactor-Imperative-Code.js'
const {
  stripDollarSign,
  stripPercentSign,
  moneyToFloat,
  percentToFloat,
  percentToPercentDecimal,
  applyDiscount
} = Refactor

describe('stripDollarSign', function () {
  it('should strip dollar signs at the start of a string', function () {
    const target = '123123123'
    const start = '$' + target

    expect(stripDollarSign(start)).to.equal(target)
  })

  it('should strip dollar signs at the middle of a string', function () {
    const target = '123123123'
    const middle = target.slice(0, 4) + '$' + target.slice(4, target.length)

    expect(stripDollarSign(middle)).to.equal(target)
  })

  it('should strip dollar signs at the end of a string', function () {
    const target = '123123123'
    const end = target + '$'

    expect(stripDollarSign(end)).to.equal(target)
  })
})

describe('stripPercentSign', function () {
  it('should strip percent signs at the start of a string', function () {
    const target = '123123123'
    const start = '%' + target

    expect(stripPercentSign(start)).to.equal(target)
  })

  it('should strip percent signs at the middle of a string', function () {
    const target = '123123123'
    const middle = target.slice(0, 4) + '%' + target.slice(4, target.length)

    expect(stripPercentSign(middle)).to.equal(target)
  })

  it('should strip percent signs at the end of a string', function () {
    const target = '123123123'
    const end = target + '%'

    expect(stripPercentSign(end)).to.equal(target)
  })
})

describe('percentToFloat', function () {
  it('should convert a moneyString to a float', function () {
    const before = '20%'
    const after = 0.20
    const result = percentToFloat(before).unBox()

    expect(result).to.equal(after)
  })
})

describe('moneyToFloat', function () {
  it('should convert a moneyString to a float', function () {
    const before = '$20.00'
    const after = 20.00
    const result = moneyToFloat(before).unBox()

    expect(result).to.equal(after)
  })
})

describe('percentToPercentDecimal', function () {
  it('should convert a float to a percentage', function () {
    const percent = 20
    const expected = 0.2
    const actual = percentToPercentDecimal(percent)

    expect(actual).to.equal(expected)
  })
})

describe('applyDiscount', function () {
  it('should return float after applying discount', function () {
    const priceString = '$5.00'
    const discountString = '20%'
    const expected = 4.00
    const actual = applyDiscount(priceString, discountString)

    return compare(actual, expected)
  })
})

const compare = (actual, expected) => actual === expected
