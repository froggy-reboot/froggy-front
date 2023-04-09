import { IFormInput } from 'src/pages/signin/SignIn';
import { privateApi, publicApi } from 'src/apis/authApi';

export async function getGoogleRegister() {
  const response = await publicApi.get('api/v1/auth/google/register');
  return response;
}

export async function getKakaoRegister() {
  const response = await publicApi.get('/api/v1/auth/kakao/register');
  return response;
}

export async function getNaverRegister() {
  const response = await publicApi.get('/api/v1/auth/naver/register');
  return response;
}

export async function getRavelryRegister() {
  const response = await publicApi.get('/api/v1/auth/ravelry/register');
  return response;
}

export async function postSocialLogin(userId: number) {
  const response = await publicApi.post('/api/v1/auth/social/login', {
    userId: userId,
  });
  return response;
}

export async function postEmailLogin(data: IFormInput) {
  const response = await publicApi.post('/api/v1/auth/email/login', {
    email: data.email,
    password: data.password,
  });
  return response;
}

export async function getRavelryConnect() {
  const response = await publicApi.get(
    '/api/v1/auth/ravelry/link/redirect-url',
  );
  return response;
}

export async function postRavelryConnect(ravelryUserId: number) {
  const response = await privateApi.post(`/api/v1/auth/ravelry/link`, {
    socialUserId: ravelryUserId,
  });
  return response;
}
