import { createStore, applyMiddleware, compose } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunkMiddleware from 'redux-thunk';
import clientMiddleware from '../actions/middlewares/clientMiddleware';
import rootReducer from '../reducers';

// Download redux dev tools here: https://github.com/zalmoxisus/redux-devtools-extension

const middleware = [
  reduxImmutableStateInvariant(),
  thunkMiddleware,
  clientMiddleware,
];

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
    ),
  );
}
