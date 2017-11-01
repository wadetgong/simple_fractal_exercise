const fs = require('fs')
const path = require('path')
const parse = require('csv-parse')
const db = require('./db')
const { Company, Candidate } = require('./db/models')

var companyParser = parse({delimiter: ','}, function(err, data) {
  if (err) console.error(err)
  const rows = data.slice(1)
  const companies = rows.map(([id, fractalIndex]) => Company.create({
    id: parseInt(id, 10),
    fractalIndex: parseFloat(fractalIndex),
  }))

  Promise.all(companies)
    .then(() => {
      fs.createReadStream(path.join(__dirname, '../data/score-records.csv')).pipe(candidateParser)
    })

})

var candidateParser = parse({delimiter: ','}, function(err, data) {
  if (err) console.error(err)
  const rows = data.slice(1)
  const candidates = rows.map(([id, comScore, codingScore, title, companyId]) => Candidate.create({
    id: parseInt(id, 10),
    communicationScore: parseInt(comScore, 10),
    codingScore: parseInt(codingScore, 10),
    title,
    companyId: parseInt(companyId, 10),
  }))
  Promise.all(candidates)
    .then(() => {
      console.log('Seeded.')
      db.close()
    })
})

db.sync({force: true})
  .then(() => {
    console.log('Synced.')
    fs.createReadStream(path.join(__dirname, '../data/companies.csv')).pipe(companyParser)
  })

