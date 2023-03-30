import { getUserInfo } from 'src/apis/authApi';
import { ComponentProps, FunctionComponent } from 'react';
import { atom, selector } from 'recoil';

interface IuserInfoAtom {
  age: null | number;
  birth: null | string;
  blogUrl: null | string;
  createdAt: string;
  deletedAt: null | string;
  email: string;
  enrollType: string;
  gender: null | string;
  id: number;
  isCertified: string;
  isRavelryIntegrated: string;
  name: null | string;
  nickname: string;
  profileImg: string;
  ravelryUserId: null | string;
  role: string;
  updatedAt: string;
}

export const modalStateAtom = atom<
  Array<{
    Component: FunctionComponent<any>;
    props: ComponentProps<FunctionComponent<any>>;
  }>
>({
  key: 'modalAtom',
  default: [],
});

export const currentArticleId = atom({
  key: 'postId',
  default: 0,
});

export const userInfoAtom = atom<IuserInfoAtom>({
  key: 'userInfo',
  default: selector({
    key: 'getUserInfo',
    get: async () => {
      const token = localStorage.getItem('accessToken');
      const userId = localStorage.getItem('userId');
      if (!token) return undefined;

      try {
        const response = await getUserInfo(userId);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
  }),
});

export const editCommentAtom = atom({
  key: 'editComment',
  default: { content: '', commentId: undefined },
});
