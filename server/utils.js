const getPercentiles = (percentileArr, percentile) => {
  let count = 0
  let totalCount = percentileArr.length
  for (let i = 0; i < totalCount; i++) {
    if (percentileArr[i] <= percentile) {
      count++
    }
  }
  return 1.0 * count / totalCount
}

module.exports = {
  getPercentiles
}
