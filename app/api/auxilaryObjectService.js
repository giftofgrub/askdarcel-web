import api from './httpClient';

// Types: schedule_days, notes, phones, addresses
export const submitAuxChangeRequest = (type, id, changeObj) => api.post(`/${type}/${id}/change_requests`,
  { change_request: changeObj });
