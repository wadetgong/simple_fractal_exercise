import React from 'react'
import { fetchUser } from '../store'
import { connect } from 'react-redux'

class CandidateSearch extends React.Component {
  constructor() {
    super()
    this.state = {
      text: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(evt) {
    this.setState({
      text: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    this.setState({
      text: ''
    })
    this.props.fetchUser(this.state.text)
  }

  render() {
    return (
      <div>
        <h3 className = "text-center">Engineer Benchmark Search</h3>
          <form className = "input-group" onSubmit = {this.handleSubmit}>
            <input
              type = "text"
              className = "form-control"
              placeholder = "Engineer ID"
              value = {this.state.text}
              onChange = {this.handleChange}
            />
            <span className = "input-group-btn">
               <button
                className = "btn btn-primary"
                type = "button"
                onClick = {this.handleSubmit}
              >
                Submit
              </button>
            </span>
          </form>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: candidateId => dispatch(fetchUser(candidateId))
  }
}

export default connect(null, mapDispatch)(CandidateSearch)
