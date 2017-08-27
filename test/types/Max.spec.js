// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Max } from '../../src/types/index.js'

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
