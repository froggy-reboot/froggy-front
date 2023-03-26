import { publicApi } from 'src/apis/authApi';

export async function getArticles({ pageParam = 1 }) {
  const response = await publicApi.get(`api/v1/articles/pages/${pageParam}`);
  return response;
}

export async function getArticleDetail(postId: string) {
  const response = await publicApi.get(`/api/v1/articles/${postId}`);
  return response;
}

export async function getCommets(articleId: number, { pageParam = 1 }) {
  const response = await publicApi.get(
    `/api/v1/articles/${articleId}/comments/pages/${pageParam}`,
  );
  return response;
}

export async function postArticles() {
  const response = await publicApi.post(`api/v1/articles/`);
  return response;
}
