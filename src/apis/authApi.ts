import axios from 'axios';

export const publicApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_IP}`,
});

export const publicHttpsApi = axios.create({
  baseURL: `${process.env.REACT_APP_HTTPS_SERVER_IP}`,
});
