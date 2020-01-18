import { FILM_DATA_RECEIVED } from "../actions/actionTypes";
import { INITIAL_STATES } from "../constants";

export default function filmReducer(state = INITIAL_STATES.films, action) {
  if (action.type === FILM_DATA_RECEIVED) {
    const updatedState = { ...state };

    action.payload.forEach(film => {
      updatedState[film.url] = film;
    });

    return updatedState;
  }

  return state;
}
