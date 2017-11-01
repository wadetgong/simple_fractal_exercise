import axios from 'axios'

// Action Types
const GET_USER = 'GET_USER'

// Initial State
const defaultUser = {}

// Action Creators
const getUser = user => ({type: GET_USER, user})

// Thunk Creators
export const fetchUser = userId =>
  dispatch =>
    axios.get(`/api/candidates/${userId}`)
      .then(res =>
        dispatch(getUser(res.data || defaultUser)))
      .catch(err => console.log(err))

// Reducer
export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return state
  }
}
