import React from 'react'
import { connect } from 'react-redux'

const CandidateInfo = props => {
  const { error, id, companyId, title } = props
  if (error) {
    return (
      <div className = "alert alert-danger">{error}</div>
    )
  }
  else if (id) {
    return (
      <div>
        <div className="col-sm-4 text-center">
          <div><h3>Engineer Id</h3></div>
          <div><h4>{id}</h4></div>
        </div>
        <div className="col-sm-4 text-center">
          <div><h3>Title</h3></div>
          <div><h4>{title}</h4></div>
        </div>
        <div className="col-sm-4 text-center">
          <div><h3>Company Id</h3></div>
          <div><h4>{companyId}</h4></div>
        </div>
        <div className="col-xs-12">
          <hr />
        </div>
      </div>
    )
  }
  else {
    return <div />
  }
}

const mapState = state => {
  const { error, id, companyId, title } = state.candidate
  return {
    error,
    id,
    companyId,
    title,
  }
}

export default connect(mapState)(CandidateInfo)
