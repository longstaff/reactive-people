import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './components/app/App';
import reducer from './reducers';

import {loadPeople, savePeople} from './utils/localStorage';

import registerServiceWorker from './registerServiceWorker';

const middleware = [ thunk ]
const store = createStore(
  reducer,
  {
    people: loadPeople()
  },
  applyMiddleware(...middleware)
)

store.subscribe(() => {
  savePeople(store.getState().people);
})

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();
