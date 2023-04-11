import { privateApi, publicApi } from 'src/apis/authApi';

interface IPatchCommentProps {
  postId: number;
  commentId: number;
  writerId: number;
  content: string;
}

interface IPostCommentProps {
  postId: number;
  content: string;
}

interface IDeleteCommentProps {
  postId: number;
  commentId: number;
}

interface IPatchArticleProps {
  formData: FormData;
  postId: number;
}

export async function getArticles({ pageParam = 1 }) {
  const response = await publicApi.get(`api/v1/articles/pages/${pageParam}`);
  return response;
}

export async function getArticleDetail(postId: string) {
  const response = await publicApi.get(`/api/v1/articles/${postId}`);
  return response;
}

export async function postArticles(formData: FormData) {
  const response = await privateApi.post(`api/v1/articles/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
}

export async function patchArticles(mutationProps: IPatchArticleProps) {
  const response = await privateApi.patch(
    `/api/v1/articles/${mutationProps.postId}`,
    mutationProps.formData,
  );
  return response;
}

export async function getCommets(articleId: number, { pageParam = 1 }) {
  const response = await publicApi.get(
    `/api/v1/articles/${articleId}/comments/pages/${pageParam}`,
  );
  return response;
}

export async function getCommet(postId: number, commentId: number) {
  const response = await publicApi.get(
    `/api/v1/articles/${postId}/comments/${commentId}`,
  );
  return response;
}

export async function patchComment(mutationProps: IPatchCommentProps) {
  const response = await privateApi.patch(
    `/api/v1/articles/${mutationProps.postId}/comments/${mutationProps.commentId}`,
    {
      articleId: mutationProps.postId,
      writerId: mutationProps.writerId,
      content: mutationProps.content,
    },
  );
  return response;
}

export async function postComment(mutationProps: IPostCommentProps) {
  const response = await privateApi.post(
    `/api/v1/articles/${mutationProps.postId}/comments`,
    { content: mutationProps.content },
  );
  return response;
}

export async function deleteComment(mutationProps: IDeleteCommentProps) {
  const response = await privateApi.delete(
    `/api/v1/articles/${mutationProps.postId}/comments/${mutationProps.commentId}`,
  );
  return response;
}

export async function deleteArticle(postId: number) {
  const response = await privateApi.delete(`/api/v1/articles/${postId}`);
  return response;
}
