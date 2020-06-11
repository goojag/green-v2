import thunk from 'redux-thunk';
import { applyMiddleware, compose, createStore } from 'redux';

import reducers from 'src/store/reducers';

// let reduxDevtools = f => f;
// if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION__) {
//   reduxDevtools = window.__REDUX_DEVTOOLS_EXTENSION__();
// }

const enhancers = compose(
  applyMiddleware(thunk)
//   reduxDevtools
);

export const makeStore = initialState => {
  return createStore(reducers, initialState, enhancers);
};
