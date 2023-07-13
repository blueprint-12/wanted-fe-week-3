import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import postReducer from "./slices/postSlice";

// middlewares
const logger = createLogger();
const middlewares = [thunk, logger];
const enhancer = applyMiddleware(...middlewares);

// make root reducer from slice reducers
const rootReducer = combineReducers({
  posts: postReducer
});

//스토어에서 관리하고 있는 상태를 조회하기 위해서 useSelector를 사용할 때 사용
export type RootReducerType = ReturnType<typeof rootReducer>;

// make store from reducers
const store = createStore(rootReducer, enhancer);

export default store;
