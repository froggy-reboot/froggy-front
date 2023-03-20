import React from 'react';
import { ReactComponent as MenuIcon } from 'src/assets/menu.svg';
import { useModal } from 'src/hooks/useModal';
import { modals } from '../modals/Modals';
import timeConverter from 'src/utils/timeConverter/timeConverter';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getCommets } from 'src/apis/boardApi';

/* export interface ICommentData {
  id: number;
  article_id: number;
  writer_id: number;
  content: string;
  created_at: string;
  deleted_at: string;
} */

export default function Comment({ articleId }) {
  const { openModal } = useModal();
  /*   const { isLoading, data } = useInfiniteQuery(
    ['comments'],
    ({ pageParam = 1 }) => getCommets(articleId, { pageParam }),
  ); */

  return (
    <div>댓글 준비중입니다.</div>
    /*     <ul className="flex h-[100%] flex-col gap-[0.2rem]">
      {comments.map((comment, idx) => (
        <>
          <li key={comment.id} className="flex">
            <img
              src={''}
              className="mt-[0.5rem] h-[3.2rem] w-[3.2rem] rounded-full"
            />
            <div className="ml-[0.9rem] mt-[0.9rem] flex flex-1 flex-col">
              <div className="flex h-[1.6rem] items-center">
                <p className="mr-auto text-Tag font-bold">
                  {'닉네임'}
                </p>
                <p className="text-Board text-black-50">
                  {timeConverter(comment.created_at)}
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
          {idx !== comments.length - 1 && (
            <hr className="w-[100%] border-black-30" />
          )}
        </>
      ))}
    </ul> */
  );
}
