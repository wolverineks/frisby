// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Min } from '../../src/types/index.js'

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
