import api from './httpClient';

export const getCategories = () => api.get('/categories');

export const getFeaturedCategories = () => api.get('/categories/featured');
