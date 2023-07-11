import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const middlewares = [thunk];

const enhancer = applyMiddleware(...middlewares);
const rootReducer = combineReducers({});
const store = createStore(rootReducer, enhancer);

export default store;
