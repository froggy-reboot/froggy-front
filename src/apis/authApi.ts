import axios from 'axios';

export const publicApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_IP}`,
});

export const privateApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_IP}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

export async function postRefreshToken() {
  const response = await publicApi.post('/api/v1/auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  return response;
}
