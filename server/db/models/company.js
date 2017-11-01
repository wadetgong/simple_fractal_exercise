const Sequelize = require('sequelize')
const db = require('../db')
const Op = Sequelize.Op

const Company = db.define('company', {
  fractalIndex: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
})

module.exports = Company

Company.prototype.findSimilar = function() {
  const similarDelta = 0.15
  return Company.findAll({
    where: {
      fractalIndex: {
        [Op.gte]: this.fractalIndex - similarDelta,
        [Op.lte]: this.fractalIndex + similarDelta
      }
    }
  })
}
