import { privateApi, publicApi } from 'src/apis/authApi';

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

export async function postComment(postId: number, content: string) {
  const response = await privateApi.post(
    `/api/v1/articles/${postId}/comments`,
    { content: content },
  );
  return response;
}

export async function deleteComment(postId: number, commentId: number) {
  const response = await privateApi.delete(
    `/api/v1/articles/${postId}/comments/${commentId}`,
  );
  return response;
}

export async function deleteArticle(postId: number) {
  const response = await privateApi.delete(`/api/v1/articles/${postId}`);
  return response;
}
