import { IFormInput } from 'src/pages/signin/SignIn';
import { publicApi } from 'src/apis/authApi';
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

export async function getNaverRegister() {
  try {
    await publicApi.get('/api/v1/auth/naver/register');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      window.open(error.response?.data);
    }
  }
}

export async function getRavelryRegister() {
  try {
    await publicApi.get('/api/v1/auth/ravelry/register');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      window.open(error.response?.data);
    }
  }
}

export async function postEmailLogin(data: IFormInput) {
  const response = await publicApi.post('/api/v1/auth/email/login', {
    email: data.email,
    password: data.password,
  });
  return response;
}
