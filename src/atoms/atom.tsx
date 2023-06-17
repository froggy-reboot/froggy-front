import { ComponentProps, FunctionComponent } from 'react';
import { atom } from 'recoil';

export const modalStateAtom = atom<
  Array<{
    Component: FunctionComponent<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    props: ComponentProps<FunctionComponent<any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
  }>
>({
  key: 'modalAtom',
  default: [],
});

export const currentArticleId = atom({
  key: 'postId',
  default: 0,
});

export const editCommentAtom = atom({
  key: 'editComment',
  default: { content: '', commentId: undefined },
});

export const isProfileAtom = atom({
  key: 'isProfile',
  default: {
    isCustom: false,
    isDefault: false,
  },
});
