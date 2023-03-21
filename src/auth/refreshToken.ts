import axios from 'axios';
import { postRefreshToken, privateApi } from 'src/apis/authApi';
import { LOGIN } from 'src/pages/signin/SignInConstants';

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
        const response = await postRefreshToken();
        if (response.status === 200) {
          const newAccessToken = response.data.token;
          localStorage.setItem('accessToken', response.data.token);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
          originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axios(originRequest);
        } else if (response.status === 404) {
          alert(LOGIN.MESSAGE.EXPIRED);
          window.location.replace('/sign-in');
        } else {
          alert(LOGIN.MESSAGE.ETC);
        }
      }
    }
    return Promise.reject(error);
  },
);
