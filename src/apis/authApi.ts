import axios from 'axios';
import { LOGIN } from 'src/pages/signin/SignInConstants';

export const publicApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_IP}`,
});

export const privateApi = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_IP}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

function postRefreshToken() {
  const response = publicApi.post('/api/v1/auth/refresh', {
    refreshToken: localStorage.getItem('refreshToken'),
  });
  return response;
}

//리프레시 토큰
privateApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;

    if (status === 401) {
      if (error.response.data.message === 'Unauthorized') {
        const originRequest = config;
        try {
          const tokenResponse = await postRefreshToken();
          if (tokenResponse.status === 201) {
            const newAccessToken = tokenResponse.data.token;
            localStorage.setItem('accessToken', tokenResponse.data.token);
            localStorage.setItem(
              'refreshToken',
              tokenResponse.data.refreshToken,
            );
            axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
            originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            return axios(originRequest);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response?.status === 404) {
              alert(LOGIN.MESSAGE.EXPIRED);
              window.location.replace('/sign-in');
            } else {
              alert(LOGIN.MESSAGE.ETC);
            }
          }
        }
      }
    }
    return Promise.reject(error);
  },
);
