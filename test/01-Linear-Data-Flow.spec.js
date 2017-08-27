// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import * as Linear from '../src/01-Linear-Data-Flow.js'
const {
  nextCharForNumberString,
  trim,
  parse,
  increment,
  fromCharCode
} = Linear

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
    const actual = fromCharCode(65)

    expect(actual).to.equal(expected)
  })
})
