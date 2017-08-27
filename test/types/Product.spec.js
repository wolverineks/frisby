// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { Product } from '../../src/types/index.js'

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
