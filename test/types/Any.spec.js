// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Any } from '../../src/types/index.js'

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
