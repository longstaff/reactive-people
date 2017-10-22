import { combineReducers } from 'redux';
import {
  INVALIDATE_LOCATIONS,
  REQUEST_LOCATIONS,
  RECEIVE_LOCATIONS,
  ADD_PERSON,
  UPDATE_PERSON,
  DELETE_PERSON,
} from './actions';

const uuid = require('uuid/v1');

const locations = (state = {
  isFetching: false,
  didInvalidate: true,
  items: [],
}, action) => {
  switch (action.type) {
    case INVALIDATE_LOCATIONS:
      return {
        ...state,
        didInvalidate: true,
      };
    case REQUEST_LOCATIONS:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false,
      };
    case RECEIVE_LOCATIONS:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: action.locations,
      };
    default:
      return state;
  }
};

const people = (state = [], action) => {
  let newState;
  switch (action.type) {
    case ADD_PERSON:
      newState = state.slice();
      newState.push({
        id: uuid(),
        name: action.name,
        age: action.age,
        avatar: action.avatar,
        bio: action.bio,
        locationCode: action.locationCode,
      });
      return newState;
    case UPDATE_PERSON:
      return state.map((val) => {
        newState = val;
        if (val.id === state.id) {
          newState = Object.assign({}, val, {
            name: action.name,
            age: action.age,
            avatar: action.avatar,
            bio: action.bio,
            locationCode: action.locationCode,
          });
        }
        return newState;
      });
    case DELETE_PERSON:
      return state.filter(val => val.id !== action.id);
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  locations,
  people,
});

export default rootReducer;
