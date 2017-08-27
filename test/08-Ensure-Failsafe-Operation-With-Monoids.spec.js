// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { All, Sum } from '../src/utils.js'

describe('Sum', function () {
  it('should return a sum type with original value, trailing empty', function () {
    const sum1 = Sum(1)
    const empty = Sum.empty()
    const expected = 1
    const actual = sum1.concat(empty).value

    expect(actual).to.equal(expected)
  })

  it('should return a sum type with original value, leading empty', function () {
    const sum1 = Sum(1)
    const empty = Sum.empty()
    const expected = 1
    const actual = empty.concat(sum1).value

    expect(actual).to.equal(expected)
  })
})

describe('All', function () {
  it('should return an All type with the original value, trailing empty', function () {
    const all1 = All(true)
    const empty = All.empty()
    const expected = true
    const actual = all1.concat(empty).value

    expect(actual).to.equal(expected)
  })

  it('should return an All type with the original value, leadning empty', function () {
    const all1 = All(true)
    const empty = All.empty()
    const expected = true
    const actual = empty.concat(all1).value

    expect(actual).to.equal(expected)
  })
})
