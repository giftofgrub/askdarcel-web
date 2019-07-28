import api from './httpClient';

export const getEligibilities = () => api.get('/eligibilities');

export const getFeaturedEligibilities = () => api.get('/eligibilities/featured');

export const updateEligibilityFeatureRank = (id, rank) => api.post(`/eligibilities/${id}`,
  { feature_rank: rank });
