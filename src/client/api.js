//api endpoint
import axios from 'axios';

//fetch recent uploads from api
export const fetchRecentUploads = () => {
  return axios.get(`/api/recentuploads`)
    .then(resp => resp.data.recentUploads);
};

//fetch recent uploads from api
export const fetchProficiencyUploads = () => {
  return axios.get(`/api/proficiency`)
      .then(resp => resp.data.proficiency);
};

//fetch recent uploaded data from api
export const fetchRecentData = () => {
  return axios.get(`/api/recentdata`)
      .then(resp => resp.data.recentdata);
};

//fetch clicked table row data from api
export const fetchRecentTRData = (id) => {
  return axios.get(`/api/recenttrdata/${id}`)
      .then(resp => resp.data.recentdata);
};

export const fetchLabData = (quarter, year) => {
  return axios.get(`/api/lab/${quarter}/${year}`)
      .then(res => res.data.quarterData)
};

export const fetchProfData = (quarter, year) => {
  return axios.get(`/api/proficiency/${quarter}/${year}`)
      .then(res => res.data.quarterData)
};
