const { expect } = require('chai')
const { getPercentiles } = require('../server/utils')

describe('Utils getPercentiles', () => {
  it ('returns the percentile rank for a given score in an array of scores', () => {
    const scores = [1, 2, 4, 6, 9, 10, 11, 20, 22, 100]
    expect(getPercentiles(scores, 100)).to.be.equal(1.0)
    expect(getPercentiles(scores, 1)).to.be.equal(0.1)
    expect(getPercentiles(scores, 0)).to.be.equal(0.0)
    expect(getPercentiles(scores, 9)).to.be.equal(0.5)
  })
})
