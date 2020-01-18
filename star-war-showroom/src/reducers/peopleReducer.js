import * as actionTypes from "../actions/actionTypes";
import { INITIAL_STATES } from "../constants";

const peopleReducer = (state = INITIAL_STATES.people, action) => {
  // update people data
  if (action.type === actionTypes.PERSON_DATA_RECEIVED) {
    const updatedState = { ...state };

    action.payload.forEach(person => {
      updatedState[person.id] = person;
    });
    return updatedState;
  }

  return state;
};

export default peopleReducer;
