import { getResource } from '../api/resourceService';
import { RESOURCE } from './actionTypes';


export const getResourceAction = id => ({
  types: [
    RESOURCE.GET_RESOURCE_PENDING,
    RESOURCE.GET_RESOURCE_SUCCESS,
    RESOURCE.GET_RESOURCE_FAILURE,
  ],
  promise: id => getResource(id),
});
