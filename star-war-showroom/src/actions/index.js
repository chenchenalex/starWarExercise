import * as actionTypes from "./actionTypes";
import fetchService from "../services/fetchServcie";
import { NUM_PER_PAGE } from "../constants";

export const getPeopleData = pageList => {
  return (dispatch, getState) => {
    const { people } = getState();
    const peopleIds = [];
    // 1. create a list of people id needs to be shown based on page id, zero based index
    for (let i = pageList * 10 + 1; i <= pageList * 10 + NUM_PER_PAGE; i++) {
      peopleIds.push(i);
    }
    /* 2. separate the ids for that page into two groups
      data already fetched: get from store
      data not yet fetched: fetch from remote
    */
    const newIds = [];
    const savedIds = [];

    peopleIds.forEach(id => {
      if (id in people) {
        savedIds.push(id);
      } else {
        newIds.push(id);
      }
    });

    // 3. copy saved data
    const savedPayload = [];
    savedIds.forEach(id => savedPayload.push(people[id]));

    // 4. (Prmoise all)fetch the people that are in the new list
    Promise.all(
      newIds.map(function(id) {
        return fetchService(`https://swapi.co/api/people/${id}/`);
      }),
    ).then(payload => {
      // add id info to each people data then saves in store
      newIds.forEach((id, index) => (payload[index].id = id));

      // 5. dispatch the newly fetched data along with the data already in store
      dispatch({
        type: actionTypes.PERSON_DATA_RECEIVED,
        payload: payload.concat(savedPayload),
      });
    });
  };
};

export const getFilms = (filmUrls = []) => {
  return (dispatch, getState) => {
    const { films } = getState();

    /* 1. separate the ids for that page into two groups
      data already fetched: get from store
      data not yet fetched: fetch from remote
    */
    const newUrls = [];
    const savedUrls = [];

    filmUrls.forEach(url => {
      if (url in films) {
        savedUrls.push(url);
      } else {
        newUrls.push(url);
      }
    });

    // 3. copy saved data
    const savedPayload = [];
    savedUrls.forEach(url => savedPayload.push(films[url]));

    // 4. (Prmoise all)fetch the films that are in the new list
    Promise.all(
      newUrls.map(function(url) {
        return fetchService(url);
      }),
    ).then(payload => {
      // 5. dispatch the newly fetched data along with the data already in store
      dispatch({
        type: actionTypes.FILM_DATA_RECEIVED,
        payload: payload.concat(savedPayload),
      });
    });
  };
};
