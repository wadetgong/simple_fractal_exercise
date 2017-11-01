import React from 'react'
import { connect } from 'react-redux'

const Score = props => {
  const { name, percentile, score } = props
  return (
    <div className="col-sm-6 percentile-score-container">
      <h3 className="text-center">{name}</h3>
      <h4 className="text-center">Score: {score}</h4>
      <div className="percentile-score-wrapper">
        <div className="percentile-score">{percentile}</div>
      </div>
    </div>
  )
}

const mapCommPercentile = state => {
  let commPercentile = state.candidate.commPercentile
    ? `${(state.candidate.commPercentile * 100).toFixed(1)}%`
    : 'n/a'
  let commScore = (commPercentile === 'n/a')
    ? 'n/a'
    : state.candidate.communicationScore

  return {
    name: 'Communication Percentile',
    percentile: commPercentile,
    score: commScore,
  }
}

const mapCodePercentile = state => {
  let codePercentile = state.candidate.codePercentile
    ? `${(state.candidate.codePercentile * 100).toFixed(1)}%`
    : 'n/a'
  let codeScore = (codePercentile === 'n/a')
    ? 'n/a'
    : state.candidate.codingScore

  return {
    name: 'Coding Percentile',
    percentile: codePercentile,
    score: codeScore,
  }
}

export const CommPercentile = connect(mapCommPercentile)(Score)
export const CodePercentile = connect(mapCodePercentile)(Score)
