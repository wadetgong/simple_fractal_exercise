const { expect } = require('chai')
const db = require('../server/db')
const { Company, Candidate } = require('../server/db/models')

describe('Candidate model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })
  describe('getPercentiles', () => {
    it('returns the correct percentiles', (done) => {
      const company1 = Company.create({ fractalIndex: 0.15 })
      const company2 = Company.create({ fractalIndex: 0.29 })
      const company3 = Company.create({ fractalIndex: 0.50 })
      const candidate1 = Candidate.create({
        communicationScore: 100,
        codingScore: 100,
        title: 'Engineer'
      })
      const candidate2 = Candidate.create({
        communicationScore: 200,
        codingScore: 0,
        title: 'Engineer'
      })
      const candidate3 = Candidate.create({
        communicationScore: 50,
        codingScore: 50,
        title: 'Engineer'
      })
      const candidate4 = Candidate.create({
        communicationScore: 100,
        codingScore: 100,
        title: 'Senior Engineer'
      })
      const candidate5 = Candidate.create({
        communicationScore: 150,
        codingScore: 150,
        title: 'Engineer'
      })
      Promise.all([company1, company2, company3])
        .then(([company1, company2, company3]) => {
          return Promise.all([
            company1,
            company2,
            company3,
            candidate1,
            candidate2,
            candidate3,
            candidate4,
            candidate5
          ])
        })
        .then(([
          company1,
          company2,
          company3,
          candidate1,
          candidate2,
          candidate3,
          candidate4,
          candidate5
        ]) => {
          return Promise.all([
            candidate1.setCompany(company1),
            candidate2.setCompany(company2),
            candidate3.setCompany(company1),
            candidate4.setCompany(company2),
            candidate5.setCompany(company3),
            candidate1
          ])
        })
        .then(([ , , , , , candidate1]) => Candidate.findById(candidate1.id))
        .then(candidate => candidate.getPercentiles())
        .then(({commPercentile, codePercentile}) => {
          expect(commPercentile).to.be.equal(2.0/3)
          expect(codePercentile).to.be.equal(1.0/1)
          done()
        })
    })
  })
})
