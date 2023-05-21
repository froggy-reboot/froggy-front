import { privateApi, publicApi } from 'src/apis/authApi';

interface IPatchProfileProps {
  userId: string | null;
  formData: FormData;
}

// 랜덤 닉네임 생성
export async function getRandomNickname() {
  const response = await publicApi.get('/api/v1/auth/random-nickname');
  return response;
}

// 프로필이미지 변경
export async function patchUserProfile(patchProfileProps: IPatchProfileProps) {
  const response = await privateApi.patch(
    `/api/v1/articles/user/photo/${patchProfileProps.userId}`,
    patchProfileProps.formData,
  );
  return response;
}

export async function getMyPostLog({ pageParam = 1 }) {
  const response = await privateApi.get(
    `/api/v1/articles/my-articles/pages/${pageParam}`,
  );
  return response;
}

export async function getMyCommentLog({ pageParam = 1 }) {
  const response = await privateApi.get(
    `/api/v1/comments/my-comments/pages/${pageParam}`,
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
