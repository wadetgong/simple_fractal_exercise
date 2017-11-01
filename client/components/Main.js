import React from 'react'
import Nav from './Nav'
import CandidateSearch from './CandidateSearch'
import CandidateInfo from './CandidateInfo'
import { CommPercentile, CodePercentile } from './Score'

const Main = () => {
  return(
    <div>
      <Nav />
      <div className="container">
        <CandidateSearch />
        <hr />
        <CandidateInfo />
        <div className="container">
          <CommPercentile />
          <CodePercentile />
        </div>
      </div>
    </div>
  )
}

export default Main
