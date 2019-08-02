import { REJECTED, PENDING, FULFILLED } from "redux-promise-middleware";
import { getResource } from '../api/resourceService'

// Actions
export const ACTIONS = {
  GET_RESOURCE: 'GET_RESOURCE',
};

const initialState = {
  resource: null,
};

export function REDUCER(state = initialState, action) {
  switch (action.type) {
  case `${ACTIONS.GET_RESOURCE}_${PENDING}`:

    console.log({ actionPending: action });
    return state;
  case `${ACTIONS.GET_RESOURCE}_${FULFILLED}`:
    console.log({ actionFulfilled: action });
    // return { ...state, resource: action.payload};
    return state
  case `${ACTIONS.GET_RESOURCE}_${REJECTED}`:
    console.log({ actionRejected: action });
    // return { ...state, error: action.payload };
    return state

  default:
    return state;
  }
}

export function getResourceAction(id) {
  return {
    type: ACTIONS.GET_RESOURCE,
    // payload: api.getResource(id)
    payload: null
  };
}
