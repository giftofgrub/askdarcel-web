import promiseMiddleware from 'redux-promise-middleware';
import {PENDING, FULFILLED, REJECTED, addRecurSchedToResource} from './utils'
import { getResource } from '../api/resourceService'

const initialState = {
  isPending: false,
  resource: null,
  error: {}
};

export const ACTIONS = {
  GET_RESOURCE: 'GET_RESOURCE',
};

export function REDUCER(state = initialState, action) {
  switch (action.type) {
    case PENDING(ACTIONS.GET_RESOURCE):
      return {
        ...state,
        isPending: true,
      }

    case FULFILLED(ACTIONS.GET_RESOURCE):
      return {
        ...state,
        isPending: false,
        resource: addRecurSchedToResource(action.payload.data.resource) //RENAME FN
      };

    case REJECTED(ACTIONS.GET_RESOURCE):
      console.log("oops")
      return {
        ...state,
        isPending: false,
        error: action.payload
      }

    default:
      return state;
  }
}

export const getResourceAction = id => {
  return {
    type: ACTIONS.GET_RESOURCE,
    async payload () {
      return await getResource(id)
    }
  }
}
