import { createStore, applyMiddleware, combineReducers } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import candidate from './candidate'

const reducer = combineReducers({ candidate })
const middleware = applyMiddleware(thunkMiddleware, createLogger({ collapsed: true}))
const store = createStore(reducer, middleware)

export default store
export * from './candidate'

