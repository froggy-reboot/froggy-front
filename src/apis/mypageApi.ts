import { privateApi } from 'src/apis/authApi';

export async function getMyPostLog({ pageParam = 1 }) {
  const response = await privateApi.get(
    `/api/v1/articles/my-articles/pages/${pageParam}`,
  );
  return response;
}
