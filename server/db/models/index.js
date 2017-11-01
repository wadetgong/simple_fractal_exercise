const Company = require('./Company')
const Candidate = require('./Candidate')

Candidate.belongsTo(Company)
Company.hasMany(Candidate)

module.exports = {
  Candidate,
  Company,
}
