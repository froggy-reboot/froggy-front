import { ComponentProps, FunctionComponent } from 'react';
import { atom } from 'recoil';

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
