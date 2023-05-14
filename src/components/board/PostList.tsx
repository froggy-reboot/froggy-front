import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';
import { ReactComponent as LikeIcon } from 'src/assets/thumb.svg';
import { ReactComponent as LikeIconActive } from 'src/assets/thumbActive.svg';
import timeConverter from 'src/utils/timeConverter/timeConverter';

export interface IArticleData {
  pages: {
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
    likedByUser: boolean;
  }[];
}

interface IPostListProp {
  data: IArticleData;
  setTarget: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null | undefined>
  >;
  isMyList?: boolean;
}

export default function PostList({ props }: { props: IPostListProp }) {
  return (
    <>
      <ul>
        {props.data?.pages.map((page) => (
          <li key={page.id} className="mb-[1rem] h-[10rem] pl-[0.4rem]">
            <Link to={`/board/${page.id}`}>
              <hr className="border-black-30" />
              <p className="mt-[0.6rem] text-BoardSub font-medium text-black-50">
                {page.user.nickname}
              </p>
              <div className="mt-[0.3rem] flex items-center">
                <span className="mini_btn inline-block h-[1.9rem] w-[3.8rem] text-center text-BoardSub font-medium leading-[1.9rem]">
                  {page.articleType}
                </span>
                <p className="ml-[0.9rem] inline-block text-Link font-medium">
                  {page.title}
                </p>
              </div>
              <p className="mt-[0.3rem] text-Callout text-black-50">
                {page.content.length > 30
                  ? `${page.content.slice(0, 30)}...`
                  : page.content}
              </p>
              <div className="mt-[0.8rem] flex justify-between text-BoardSub">
                <div>
                  {page.likedByUser ? (
                    <LikeIconActive className="mr-[0.3rem] inline-block h-[1.5rem] w-[1.5rem]" />
                  ) : (
                    <LikeIcon className="mr-[0.3rem] inline-block h-[1.5rem] w-[1.5rem]" />
                  )}
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
      <div ref={props.setTarget} className="h-[1rem]" />
    </>
  );
}
