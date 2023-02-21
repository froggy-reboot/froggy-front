import React from 'react';
import { PAGE_TITLE } from 'src/components/header/HeaderConstants';
import { ReactComponent as Logo } from 'src/assets/logo.svg';

const HEADER_TITLE = [
  {
    route: '/',
    title: <Logo className="h-[2.2rem] w-[8rem]" />,
  },
  {
    route: '/sign-up',
    title: PAGE_TITLE.SIGN_UP,
  },
  {
    route: '/board',
    title: <Logo className="h-[2.2rem] w-[8rem]" />,
  },
  {
    route: '/board/create',
    title: PAGE_TITLE.BOARD.CREATE,
  },
  {
    route: '/board/detail',
    title: PAGE_TITLE.BOARD.DETAIL,
  },
  {
    route: '/board/comment',
    title: PAGE_TITLE.BOARD.COMMENT,
  },
  {
    route: '/my-page',
    title: PAGE_TITLE.MY_PAGE,
  },
  {
    route: '/feed',
    title: PAGE_TITLE.FEED.MAIN,
  },
  {
    route: '/feed/create',
    title: PAGE_TITLE.FEED.CREATE,
  },
  {
    route: '/feed/thread',
    title: PAGE_TITLE.FEED.THREAD,
  },
];

export { HEADER_TITLE };
