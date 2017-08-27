// @flow
import { expect } from 'chai'
import { describe, it } from 'mocha'
import { getPort } from '../src/04-Use-Chain-For-Composable-Error-Handling.js'

describe('getPort', function () {
  describe('onError', function () {
    describe('when file not found', function () {
      it('should return default port number', function () {
        const filepath = 'non-existent-file.txt'
        const expected = 3000
        const actual = getPort(filepath)

        expect(actual).to.equal(expected)
      })
    })

    describe('when corrupt file found', function () {
      it('should return default port number', function () {
        const filepath = './test/corrupt-config.json'
        const expected = 3000
        const actual = getPort(filepath)

        expect(actual).to.equal(expected)
      })
    })
  })

  describe('onSuccess', function () {
    it('should return number of port', function () {
      const filepath = './test/config.json'
      const expected = 8888
      const actual = getPort(filepath)

      expect(actual).to.equal(expected)
    })
  })
})
