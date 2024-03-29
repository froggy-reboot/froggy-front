import { IFilter } from 'src/pages/board/BoardMain';
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

interface IPostReportProps {
  postId: number;
  commentId?: number;
  content: string;
}

export async function getArticles({ pageParam = 1 }, filter?: IFilter) {
  const isLogin = localStorage.getItem('accessToken');
  const response = isLogin
    ? await privateApi.get(`api/v1/articles/pages/${pageParam}`, {
        params: filter,
      })
    : await publicApi.get(`api/v1/articles/pages/${pageParam}`, {
        params: filter,
      });
  return response;
}

export async function getArticleDetail(postId: string) {
  const isLogin = localStorage.getItem('accessToken');
  const response = isLogin
    ? await privateApi.get(`/api/v1/articles/${postId}`)
    : await publicApi.get(`/api/v1/articles/${postId}`);
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

export async function postLike(postId: number) {
  const response = await privateApi.post(`/api/v1/article-likes/${postId}`);
  return response;
}

export async function postReportArticle({ postId, content }: IPostReportProps) {
  const response = await privateApi.post('/api/v1/articles/report', {
    articleId: postId,
    reason: content,
  });
  return response;
}

export async function postReportComment({
  postId,
  commentId,
  content,
}: IPostReportProps) {
  const response = await privateApi.post(
    `/api/v1/articles/${postId}/comments/report`,
    {
      commentId: commentId,
      reason: content,
    },
  );
  return response;
}
