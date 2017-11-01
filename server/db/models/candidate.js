const Sequelize = require('sequelize')
const db = require('../db')
const { getPercentiles } = require('../../utils')

const Candidate = db.define('candidate', {
  communicationScore: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  codingScore: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  title: {
    type: Sequelize.ENUM,
    values: ['Engineer', 'Senior Engineer'],
    allowNull: false,
  }
}, {
  defaultScope: {
    include: [
      { all: true }
    ]
  }
})

module.exports = Candidate

Candidate.prototype.getPercentiles = function() {
  return this.getCompany()
    .then(company => {
      return company.findSimilar()
    })
    .then(companies => {
      return Promise.all(companies.map(company => company.getCandidates()))
    })
    .then(companyCandidates => {
      let comparables = []
      companyCandidates.forEach(company => {
        comparables = [...comparables, ...company.filter(candidate => candidate.title === this.title)]
      })
      const commScores = comparables.map(candidate => candidate.communicationScore)
      const codeScores = comparables.map(candidate => candidate.codingScore)
      return {
        commPercentile: getPercentiles(commScores, this.communicationScore),
        codePercentile: getPercentiles(codeScores, this.codingScore)
      }
    })
}
