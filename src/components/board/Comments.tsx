import React, { Fragment, useState } from 'react';
import { ReactComponent as MenuIcon } from 'src/assets/menu.svg';
import { useModal } from 'src/hooks/useModal';
import { modals } from '../modals/Modals';
import timeConverter from 'src/utils/timeConverter/timeConverter';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommets } from 'src/apis/boardApi';
import { useIntersectionObserver } from 'src/hooks/useIntersectionObserver';

export interface ICommentData {
  id: number;
  content: string;
  user: {
    id: number;
    nickname: string;
  };
  images: [];
}

export default function Comment({ articleId }: { articleId: number }) {
  const [commentList, setCommentList] = useState<ICommentData[]>([]);
  const { openModal } = useModal();
  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['comments'],
    ({ pageParam = 1 }) => getCommets(articleId, { pageParam }),
    {
      onSuccess: (data) =>
        setCommentList(() => data?.pages.flatMap((page) => page.data)),
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return lastPage.data.length === 0 ? undefined : nextPage;
      },
    },
  );
  const { setTarget } = useIntersectionObserver({ hasNextPage, fetchNextPage });

  return (
    <>
      <ul className="flex h-[100%] flex-col gap-[0.2rem]">
        {commentList.map((comment, idx) => (
          <Fragment key={comment.id}>
            <li className="flex">
              <img
                src={''}
                className="mt-[0.5rem] h-[3.2rem] w-[3.2rem] rounded-full"
              />
              <div className="ml-[0.9rem] mt-[0.9rem] flex flex-1 flex-col">
                <div className="flex h-[1.6rem] items-center">
                  <p className="mr-auto text-Tag font-bold">{'닉네임'}</p>
                  <p className="text-Board text-black-50">
                    {/* timeConverter(comment.createdAt) */ '1시간 전'}
                  </p>
                  <MenuIcon
                    onClick={() =>
                      openModal(modals.UpdateDeleteModal, {
                        commentId: comment.id,
                      })
                    }
                    className="h-[1.6rem] w-[1.6rem] fill-black-50"
                  />
                </div>
                <p className="mt-[1rem] mb-[0.6rem] text-Tag font-normal">
                  {comment.content}
                </p>
              </div>
            </li>
            {idx !== commentList.length - 1 && (
              <hr className="w-[100%] border-black-30" />
            )}
          </Fragment>
        ))}
      </ul>
      <div ref={setTarget} className="h-[1rem]" />
    </>
  );
}
