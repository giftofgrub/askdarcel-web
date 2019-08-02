import axios from 'axios';

// const baseURL = baseURLs[process.env.NODE_ENV];
const baseURL = '/api';
const api = axios.create({
  baseURL,
  // headers: {
  //   'Accept': 'application/json',
  //   'Content-Type': 'application/json',
  // },
});
export default api;
