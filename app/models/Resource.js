import { REJECTED, PENDING, FULFILLED } from "redux-promise-middleware";
import { getResource } from '../api/resourceService'

// Actions
export const ACTIONS = {
  GET_RESOURCE: 'GET_RESOURCE',
};

const initialState = {
  isPending: false,
  resource: null,
  error: {}
};


export function REDUCER(state = initialState, action) {
  switch (action.type) {
    case `${ACTIONS.GET_RESOURCE}_${'PENDING'}`:
      return {
        ...state,
        isPending: true,
      }

    case `${ACTIONS.GET_RESOURCE}_${'FULFILLED'}`:
      console.log("fulfilled action",action.payload.data);
      return {
        ...state,
        isPending: false,
        resource: action.payload.data.resource,
      };

    case `${ACTIONS.GET_RESOURCE}_${'REJECTED'}`:
      return {
        ...state,
        isPending: false,
        error: action.payload
      }

    default:
      return state;
  }
}

export const getResourceAction = (id) => {
  return {
    type: ACTIONS.GET_RESOURCE,
    async payload () {
      const resourceData = await getResource(id)
      return resourceData
    }
  }
}
