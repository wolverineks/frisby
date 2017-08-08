import { expect } from 'chai'
import { describe, it } from 'mocha'
import { All, First, Sum } from '../src/utils.js'
import { Map } from 'immutable-ext'

describe('concat', function () {
  it('should combine 2 accounts correctly', function () {
    const acct1 = Map({ name: First('Nico'), isPaid: All(true), points: Sum(10), friends: ['Franklin'] })
    const acct2 = Map({ name: First('Nico'), isPaid: All(false), points: Sum(2), friends: ['Gatsby'] })

    const expectedName = 'Nico'
    const expectedIsPaid = false
    const expectedPoints = 12
    const expectedFriends = ['Franklin', 'Gatsby']

    const result = acct1.concat(acct2).toJS()
    const name = result.name.value
    const isPaid = result.isPaid.value
    const points = result.points.value
    const friends = result.friends

    expect(name).to.equal(expectedName)
    expect(isPaid).to.equal(expectedIsPaid)
    expect(points).to.equal(expectedPoints)
    expect(friends).to.deep.equal(expectedFriends)
  })
})
