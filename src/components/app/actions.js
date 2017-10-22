import fetch from 'isomorphic-fetch';

/** Locations for flags etc */
export const INVALIDATE_LOCATIONS = 'com.andrewlongstaff.people.locations.invalidate';
export const REQUEST_LOCATIONS = 'com.andrewlongstaff.people.locations.request';
export const RECEIVE_LOCATIONS = 'com.andrewlongstaff.people.locations.recieve';

export function requestLocations() {
  return {
    type: REQUEST_LOCATIONS,
  };
}
export function receiveLocations(data) {
  return {
    type: RECEIVE_LOCATIONS,
    locations: data,
  };
}
export function invalidateLocations() {
  return {
    type: INVALIDATE_LOCATIONS,
  };
}

/** Locations thunk from server */
function fetchPosts() {
  return (dispatch) => {
    dispatch(requestLocations());
    return fetch('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        return response.json().then((res) => {
          const mapped = res.map((country) => {
            return {
              flag: country.flag,
              name: country.name,
              code: country.alpha3Code,
            };
          });
          return mapped;
        }, () => {
          return [];
        });
      })
      .then(json => dispatch(receiveLocations(json)));
  };
}

/** Heper methods for caching */
function shouldFetchPosts(state) {
  const { locations } = state;
  if (!locations) {
    return true;
  } else if (locations.isFetching) {
    return false;
  } else {
    return locations.didInvalidate;
  }
}

export function fetchLocationsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      return dispatch(fetchPosts());
    } else {
      return Promise.resolve();
    }
  };
}

/** People */
export const ADD_PERSON = 'com.andrewlongstaff.people.person.add';
export const UPDATE_PERSON = 'com.andrewlongstaff.people.person.update';
export const DELETE_PERSON = 'com.andrewlongstaff.people.person.delete';

export function addPeople(name, age, avatar, bio, locationCode) {
  return {
    type: ADD_PERSON,
    name,
    age,
    avatar,
    bio,
    locationCode,
  };
}
export function removePeople(id) {
  return {
    type: DELETE_PERSON,
    id,
  };
}
export function updatePeropls(id, name, age, avatar, bio, locationCode) {
  return {
    type: UPDATE_PERSON,
    id,
    name,
    age,
    avatar,
    bio,
    locationCode,
  };
}
