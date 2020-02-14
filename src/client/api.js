//api endpoint
import axios from 'axios';

//fetch recent uploads from api
export const fetchRecentUploads = () => {
  return axios.get(`/api/recentuploads`)
    .then(resp => resp.data.recentUploads);
};
