// npm install redux
// npm install react-redux
//1. store (state,dispatch)
//2. actions
//3. reducers
//4. connect
import { createStore, applyMiddleware, compose } from "redux"
import root from "./reducers"
import thunk from "redux-thunk"
// import saga from "redux-saga"
const composeA = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(root, composeA(applyMiddleware(thunk)))
export default store;




