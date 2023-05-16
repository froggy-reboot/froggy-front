import { privateApi } from 'src/apis/authApi';

export async function getMyPostLog({ pageParam = 1 }) {
  const response = await privateApi.get(
    `/api/v1/articles/my-articles/pages/${pageParam}`,
  );
  return response;
}

export async function getLogout() {
  const response = await privateApi.get('/api/v1/auth/logout');
  return response;
}

export async function postWithdraw(password?: string) {
  let response;
  if (password) {
    response = await privateApi.post('/api/v1/auth/withdraw', {
      userId: Number(localStorage.getItem('userId')),
      password: password,
    });
  } else {
    response = await privateApi.post('/api/v1/auth/withdraw', {
      userId: Number(localStorage.getItem('userId')),
    });
  }
  return response;
}
