const router = require('express').Router()
const { Candidate } = require('../db/models')

router.get('/:candidateId', (req, res, next) => {
  const candidateId = parseInt(req.params.candidateId, 10)
  if (!candidateId) {
    res.json({error: `Invalid ID type.`})
    return
  }

  Candidate.findById(candidateId)
    .then(candidate => {
      if (!candidate) {
        res.json({error: `Candidate not found: ID ${candidateId} does not exist.`})
      } else {
        return Promise.all([candidate, candidate.getPercentiles()])
      }
    })
    .then(results => {
      if (results) {
        const [candidate, percentiles] = results
        const { commPercentile, codePercentile } = percentiles
        candidate.dataValues.commPercentile = commPercentile
        candidate.dataValues.codePercentile = codePercentile
        res.json(candidate)
      }
    })
    .catch(next)
})
module.exports = router
