import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducers from "./reducers";
import { INITIAL_STATES } from "./constants/index";

const store = createStore(rootReducers, INITIAL_STATES, applyMiddleware(thunk));

export default store;
