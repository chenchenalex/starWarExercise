import { combineReducers } from "redux";
import peopleReducer from "./peopleReducer";
import filmReducer from "./filmReducer";

export default combineReducers({ people: peopleReducer, films: filmReducer });
