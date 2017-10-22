export const STATE_PEOPLE = 'com.andrewlongstaff.people.state.people';

export const loadState = (key) => {
  try {
    let retVal;
    const state = localStorage.getItem(key);
    if (state !== null) {
      retVal = JSON.parse(state);
    };
    return retVal;
  } catch (err) {
    console.error(`Load state ${key} failed with err ${err}`);
    return undefined;
  }
};
export const saveState = (key, val) => {
  try {
    const json = JSON.stringify(val);
    return localStorage.setItem(key, json);
  } catch (err) {
    console.error(`Save state ${key} failed with err ${err}`);
    return false;
  }
};

export const loadPeople = loadState.bind(this, STATE_PEOPLE);
export const savePeople = saveState.bind(this, STATE_PEOPLE);
