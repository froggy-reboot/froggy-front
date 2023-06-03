import React from 'react';
import { PAGE_TITLE } from 'src/components/header/HeaderConstants';
import { ReactComponent as Logo } from 'src/assets/logo.svg';

const HEADER_TITLE = [
  {
    route: '/',
    title: <Logo className="h-[2.2rem] w-[8rem] fill-green-50" />,
    isMain: true,
  },
  {
    route: '/sign-up',
    title: PAGE_TITLE.SIGN_UP,
    isMain: false,
  },
  {
    route: '/board',
    title: <Logo className="h-[2.2rem] w-[8rem] fill-green-50" />,
    isMain: true,
  },
  {
    route: '/board/create',
    title: PAGE_TITLE.BOARD.CREATE,
    isMain: false,
  },
  {
    route: '/board/detail',
    title: PAGE_TITLE.BOARD.DETAIL,
    isMain: false,
  },
  {
    route: '/board/comment',
    title: PAGE_TITLE.BOARD.COMMENT,
    isMain: false,
  },
  {
    route: '/feed',
    title: PAGE_TITLE.FEED.MAIN,
    isMain: false,
  },
  {
    route: '/feed/create',
    title: PAGE_TITLE.FEED.CREATE,
    isMain: false,
  },
  {
    route: '/feed/thread',
    title: PAGE_TITLE.FEED.THREAD,
    isMain: false,
  },
  {
    route: '/my-page/setting',
    title: PAGE_TITLE.MY_PAGE.SETTING,
    isMain: false,
  },
  {
    route: '/my-page/articles',
    title: PAGE_TITLE.MY_PAGE.ARTICLES,
    isMain: false,
  },
  {
    route: '/my-page/comments',
    title: PAGE_TITLE.MY_PAGE.COMMENTS,
    isMain: false,
  },
  {
    route: '/my-page/update',
    title: PAGE_TITLE.MY_PAGE.UPDATE,
    isMain: false,
  },
  {
    route: '/report',
    title: PAGE_TITLE.REPORT,
    isMain: false,
  },
  {
    route: '/reset-passward',
    title: PAGE_TITLE.RESET_PASSWARD,
    isMain: false,
  },
];

export { HEADER_TITLE };
