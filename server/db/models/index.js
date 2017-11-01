const Candidate = require('./candidate')
const Company = require('./company')

Candidate.belongsTo(Company)
Company.hasMany(Candidate)

module.exports = {
  Candidate,
  Company,
}
