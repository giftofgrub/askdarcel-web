import { expect } from 'chai';
import { Resource } from '../index';
import { ACTIONS } from '../Resource'
import {PENDING, FULFILLED, REJECTED} from './utils'

import MockAdapter from 'axios-mock-adapter';
import axInstance from '../../api/httpClient';
import resource from '../../api/__tests__/__mocks__/resourceResponse.json';

import configureStore from 'redux-mock-store'
import promise from "redux-promise-middleware";
const middlewares = [promise]
const mockStore = configureStore(middlewares)

const existingState = {
  isPending: false,
  resource: null,
  error: {}
};


//REDUCER TEST
describe('Resource Model Reducer', () => {
  let mockAdapter

  before(() => {
    mockAdapter = new MockAdapter(axInstance);
  })

  it('should take empty state', () => {
    const state = Resource.REDUCER(undefined, {});
    expect(state.resource).to.be.null;
    expect(state.isPending).to.be.false;
    expect(state.error).to.be.empty;
  });

  it('should set pending to true', () => {
    const newState = Resource.REDUCER(existingState, {type: PENDING(ACTIONS.GET_RESOURCE)});
    expect(newState.isPending).to.be.true;
  });

  it('should set the resource object', () => {
    const fulfilledAction = {
      type: FULFILLED(ACTIONS.GET_RESOURCE),
      payload: {data: {resource}}
    }

    const newState = Resource.REDUCER(existingState, fulfilledAction);
    expect(newState.isPending).to.be.false;
    expect(newState.resource).to.deep.equal(resource);
    expect(newState.error).to.be.empty;
  });

  it('should handle failed get resource request', () => { //format as actual error
    const error = {error: "400"}
    const rejectedAction = {
      type: REJECTED(ACTIONS.GET_RESOURCE),
      payload: error
    }

    const newState = Resource.REDUCER(existingState, rejectedAction);
    // expect(newState.resource).to.deep.equal(resource); //should resource reset be null for errors?
    expect(newState.resource).to.be.null;
    expect(newState.isPending).to.be.false;
    expect(newState.error).to.deep.equal(error);
  });

  it('should take action creator', () => {
    const newState = Resource.REDUCER(existingState, Resource.getResourceAction(1));
    expect(newState.isPending).to.be.false;
  });
});


// ACTION CREATOR TEST
describe('Resource Model Actions', () => {
  let mockAdapter

  before(() => {
    mockAdapter = new MockAdapter(axInstance);
  });

  it('should create correct action', () => {
    const store = mockStore({})
    const id = 1
    mockAdapter.onGet(`/resources/${id}`).reply(200, { resource });

    const action = Resource.getResourceAction(id)
    return store.dispatch(action)
    .then(() => {
      const actions = store.getActions()
      const newState = store.getState()
      const firedActionTypes = actions.map(action => action.type)
      expect(firedActionTypes).to.deep.equal(['GET_RESOURCE_PENDING', 'GET_RESOURCE_FULFILLED'])
      expect(actions[1].payload.status).to.equal(200)
    })
  });
});
