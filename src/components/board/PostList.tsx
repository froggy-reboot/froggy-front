import React from 'react';
import { ReactComponent as LikeIcon } from 'src/assets/empty_like.svg';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getArticles } from 'src/apis/boardApi';
import Loader from 'src/components/loader/Loader';
import timeConverter from 'src/utils/timeConverter/timeConverter';
import { Link } from 'react-router-dom';
import { useIntersectionObserver } from 'src/hooks/useIntersectionObserver';
import { AxiosError, AxiosResponse } from 'axios';

interface IArticleData {
  id: number;
  writerId: number;
  articleType: string;
  liked: number;
  title: string;
  content: string;
  createdAt: string;
  deletedAt: null | string;
  user: {
    nickname: string;
  };
  commentCount: number;
}

export interface IFilter {
  filter: string | null;
}

export default function PostList(filter: IFilter) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    AxiosResponse,
    AxiosError,
    IArticleData
  >(
    ['articles', filter],
    ({ pageParam = 1 }) => getArticles(filter, { pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length === 0 ? undefined : nextPage;
      },
      select: (data) => ({
        pages: data?.pages.flatMap((page) => page.data),
        pageParams: data.pageParams,
      }),
    },
  );

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <ul>
        {data?.pages.map((page) => (
          <li key={page.id} className="mb-[0.7rem] h-[9rem] pl-[0.4rem]">
            <Link to={`/board/${page.id}`}>
              <hr className="border-black-30" />
              <p className="mt-[0.6rem] text-BoardSub font-medium text-black-50">
                {page.user.nickname}
              </p>
              <div className="mt-[0.5rem]">
                <span className="mini_btn inline-block h-[1.9rem] w-[3.8rem] text-center text-Board leading-[1.9rem]">
                  {page.articleType}
                </span>
                <p className="ml-[0.9rem] inline-block text-Tag">
                  {page.title}
                </p>
              </div>
              <p className="mt-[0.3rem] text-Board text-black-50">
                {page.content.length > 40
                  ? `${page.content.slice(0, 40)}...`
                  : page.content}
              </p>
              <div className="mt-[0.8rem] flex justify-between">
                <div>
                  <LikeIcon className="mr-[0.3rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
                  <span>{page.liked}</span>
                  <ChatIcon className="mr-[0.3rem] ml-[0.4rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
                  <span>{page.commentCount}</span>
                </div>
                <p className="pr-[0.8rem] text-Board text-black-50">
                  {timeConverter(page.createdAt)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      <div ref={setTarget} className="h-[1rem]" />
    </>
  );
}
