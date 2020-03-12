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

export const registerUser = (email, password) => {
  return axios.post(`/api/register`, {
    email: email,
    password: password
  }).then(res => res.data)
};

export const findUser = (email, password) => {
  return axios.post(`/api/login`, {
    email: email,
    password: password
  }).then(res => res)
};

export const checkToken = () => {
  return axios.get(`/api/checkToken`).then(res => res)
};
