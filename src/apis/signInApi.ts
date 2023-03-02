import { IFormInput } from 'src/pages/signin/SignIn';
import { publicApi, publicHttpsApi } from 'src/apis/authApi';
import axios from 'axios';

export async function getGoogleRegister() {
  try {
    await publicApi.get('api/v1/auth/google/register');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      window.open(error.response?.data);
    }
  }
}

export async function getKakaoRegister() {
  const response = await publicApi.get('/api/v1/auth/kakao/register');
  if (response.status === 201) {
    window.open(response?.data);
  }
}

export async function getNaverRegister() {
  const response = await publicApi.get('/api/v1/auth/naver/register');
  if (response.status === 201) {
    window.open(response?.data);
  }
}

export async function getRavelryRegister() {
  const response = await publicHttpsApi.get('/api/v1/auth/ravelry/register');
  if (response.status === 201) {
    window.open(response?.data);
  }
}

export async function postEmailLogin(data: IFormInput) {
  const response = await publicApi.post('/api/v1/auth/email/login', {
    email: data.email,
    password: data.password,
  });
  return response;
}
