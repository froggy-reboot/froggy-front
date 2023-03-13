import React from 'react';
import { ReactComponent as MenuIcon } from 'src/assets/menu.svg';
import { ReactComponent as LikeIcon } from 'src/assets/empty_like.svg';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';
import Comment, { ICommentData } from 'src/components/board/Comments';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import timeConverter from 'src/utils/timeConverter/timeConverter';
import { useQuery } from '@tanstack/react-query';
import { getArticleDetail } from 'src/apis/boardApi';
import { useParams } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';

const dummy = {
  fileList: [
    'https://cdn.pixabay.com/photo/2016/08/23/13/12/knitting-1614283__340.jpg',
    'https://cdn.pixabay.com/photo/2021/11/12/13/14/sweater-6788998_960_720.jpg',
    'https://cdn.pixabay.com/photo/2016/08/23/13/12/knitting-1614283__340.jpg',
    'https://cdn.pixabay.com/photo/2021/11/12/13/14/sweater-6788998_960_720.jpg',
  ],
};

export interface IArticleDetail {
  data: {
    id: number;
    writer_id: number;
    article_type: string;
    liked: number;
    title: string;
    content: string;
    created_at: string;
    deleted_at: string | null;
    comments: ICommentData[];
    comment_count: number;
    user: {
      writer_nickname: string;
    };
    __entity: string;
  };
}

export default function BoardDetail() {
  const { openModal } = useModal();
  const { postId } = useParams() as { postId: string };
  const { isLoading, data } = useQuery<IArticleDetail>(
    ['article', postId],
    () => getArticleDetail(postId),
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {data && (
        <div className="container">
          <main className="w-[100%] px-[2rem]">
            <div className="mt-[2.2rem] grid grid-cols-[50px_3fr_1fr] items-center">
              <img
                src=""
                className="h-[5rem] w-[5rem] rounded-full bg-green-30"
              />
              <div className="ml-[15px]">
                <p className="text-Body font-bold">
                  {data?.data.user.writer_nickname}
                </p>
                <p className="text-Board text-black-50">
                  {`${timeConverter(data?.data.created_at)} 작성`}
                </p>
              </div>
              <MenuIcon
                onClick={() =>
                  openModal(modals.UpdateDeleteModal, {
                    postId: postId,
                  })
                }
                className="h-[2rem] w-[2rem] justify-self-end fill-black-100"
              />
            </div>
            <article className="mt-[1.3rem]">
              <h1 className="h-[3.6rem] text-Body font-bold leading-[3.6rem]">
                <span className="tag mr-[7px]">{data?.data.article_type}</span>
                {data?.data.title}
              </h1>
              <p className="my-[0.5rem] text-Tag font-normal">
                {data?.data.content}
              </p>
              {dummy.fileList.length > 1 && (
                <div className="my-[1.2rem] flex gap-[1rem] overflow-y-scroll">
                  {dummy.fileList.map((src, idx) => (
                    <img
                      key={idx}
                      src={src}
                      className="h-[15rem] w-[15rem] rounded-[5px] object-cover"
                    />
                  ))}
                </div>
              )}
              {dummy.fileList.length === 1 && (
                <img
                  src={dummy.fileList[0]}
                  className="h-[19.6rem] w-[100%] rounded-[5px] object-cover"
                />
              )}
            </article>
            <p className="mt-[3px] text-Callout">
              <LikeIcon className="mr-[0.3rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
              <span>{data?.data.liked}</span>
              <ChatIcon className="mr-[0.3rem] ml-[0.4rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
              <span>{data?.data.comment_count}</span>
            </p>
            <hr className="mt-[1.4rem] w-[100%] border-black-30" />
          </main>
          <div className="mt-[1rem] mb-[3rem] w-[100%] overflow-scroll px-[3.5rem] ">
            <Comment comments={data.data.comments} />
          </div>
        </div>
      )}
    </>
  );
}
