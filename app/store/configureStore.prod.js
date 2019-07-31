import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import clientMiddleware from '../actions/middlewares/clientMiddleware';

import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware, clientMiddleware),
  );
}
