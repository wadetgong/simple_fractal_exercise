const { expect } = require('chai')
const db = require('../server/db')
const { Company } = require('../server/db/models')

describe('Company model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('findSimilar', function() {
    it('returns the correct companies', (done) => {
      const company1 = Company.create({ fractalIndex: 0.14 })
      const company2 = Company.create({ fractalIndex: 0.29 })
      const company3 = Company.create({ fractalIndex: 0.35 })
      const company4 = Company.create({ fractalIndex: 0.43 })
      const company5 = Company.create({ fractalIndex: 0.50 })

      Promise.all([company1, company2, company3, company4, company5])
        .then(([company1, company2, company3, company4, company5]) => {
          return Company.findById(company2.id)
        })
        .then(company => company.findSimilar())
        .then(similarCompanies => {
          expect(similarCompanies.length).to.be.equal(4)
          done()
        })
        .catch(done)
    })
  })
})
