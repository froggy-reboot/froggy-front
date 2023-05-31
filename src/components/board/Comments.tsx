import React, { Fragment } from 'react';
import { ReactComponent as MenuIcon } from 'src/assets/menu.svg';
import { useModal } from 'src/hooks/useModal';
import { modals } from '../modals/Modals';
import timeConverter from 'src/utils/timeConverter/timeConverter';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommets } from 'src/apis/boardApi';
import { useIntersectionObserver } from 'src/hooks/useIntersectionObserver';
import { AxiosError, AxiosResponse } from 'axios';
import { useParams } from 'react-router-dom';

export interface ICommentData {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    nickname: string;
    profileImg: string;
  };
  images: string[];
}

export default function Comment({ articleId }: { articleId: number }) {
  const { openModal } = useModal();
  const { postId } = useParams() as { postId: string };
  const userId = localStorage.getItem('userId') as string;
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery<
    AxiosResponse,
    AxiosError,
    ICommentData
  >(
    ['comments', postId],
    ({ pageParam = 1 }) => getCommets(articleId, { pageParam }),
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length === 0 ? undefined : nextPage;
      },
      select: (data) => ({
        pages: data.pages.flatMap((page) => page.data),
        pageParams: data.pageParams,
      }),
    },
  );

  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <>
      <ul className="flex h-[100%] flex-col gap-[0.2rem]">
        {data?.pages.map((comment, idx) => (
          <Fragment key={comment.id}>
            <li className="flex">
              <img
                src={comment.user.profileImg}
                className="mt-[0.5rem] h-[3.2rem] w-[3.2rem] rounded-full object-cover"
              />
              <div className="ml-[0.9rem] mt-[0.9rem] flex flex-1 flex-col">
                <div className="flex h-[1.6rem] items-center">
                  <p className="mr-auto text-Tag font-bold">
                    {comment.user.nickname}
                  </p>
                  <p className="text-Board text-black-50">
                    {timeConverter(comment.createdAt)}
                  </p>
                  <MenuIcon
                    onClick={() =>
                      Number(userId) === comment.user.id
                        ? openModal(modals.UpdateDeleteModal, {
                            postId: Number(postId),
                            commentId: comment.id,
                          })
                        : openModal(modals.ReportModal, {
                            postId: Number(postId),
                            commentId: comment.id,
                          })
                    }
                    className="h-[2.6rem] w-[2.6rem] cursor-pointer fill-black-50 p-[0.5rem]"
                  />
                </div>
                <p className="mt-[1rem] mb-[0.6rem] whitespace-pre-line text-Tag font-normal">
                  {comment.content}
                </p>
              </div>
            </li>
            {idx !== data?.pages.length - 1 && (
              <hr className="w-[100%] border-black-30" />
            )}
          </Fragment>
        ))}
      </ul>
      <div ref={setTarget} className="h-[1rem]" />
    </>
  );
}
