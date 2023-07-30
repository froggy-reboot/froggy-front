import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';
import { ReactComponent as LikeIcon } from 'src/assets/thumb.svg';
import { ReactComponent as LikeIconActive } from 'src/assets/thumbActive.svg';
import timeConverter from 'src/utils/timeConverter/timeConverter';
import { AxiosResponse } from 'axios';
import { InfiniteData } from '@tanstack/react-query';

interface IPostListProp {
  data: InfiniteData<AxiosResponse>;
  setTarget: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null | undefined>
  >;
  isMyList?: boolean;
}

export default function PostList({ props }: { props: IPostListProp }) {
  return (
    <>
      <ul>
        {/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */}
        {props.data?.pages.map((page: any) => (
          <li
            key={page.id}
            className={`mb-[1rem] pl-[0.4rem] ${
              props.isMyList ? 'h-[7.7rem]' : ' h-[10rem]'
            }`}>
            <hr className="border-black-30" />
            <Link to={`/board/${page.id}`} className="flex justify-between">
              <div>
                {!props.isMyList && (
                  <p className="mt-[0.6rem] text-BoardSub font-medium text-black-50">
                    {page.user.nickname}
                  </p>
                )}
                <div className="mt-[0.3rem] flex items-center">
                  <span className="mini_btn inline-block h-[1.9rem] w-[3.8rem] text-center text-BoardSub font-medium leading-[1.9rem]">
                    {page.articleType}
                  </span>
                  <p className="ml-[0.9rem] inline-block text-Link font-medium">
                    {page.images.length > 0
                      ? page.title.length > 18
                        ? `${page.title.slice(0, 18)}...`
                        : page.title
                      : page.title.length > 24
                      ? `${page.title.slice(0, 24)}...`
                      : page.title}
                  </p>
                </div>
                <p className="mt-[0.3rem] text-Callout text-black-50">
                  {page.images.length > 0
                    ? page.content.length > 24
                      ? `${page.content.slice(0, 24)}...`
                      : page.content
                    : page.content.length > 30
                    ? `${page.content.slice(0, 30)}...`
                    : page.content}
                </p>
                <div className="mt-[0.8rem] flex gap-[1rem] text-BoardSub">
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
                  <p className="my-auto h-[1.5rem] pr-[0.8rem] text-Board text-black-50">
                    {timeConverter(page.createdAt)}
                  </p>
                </div>
              </div>
              {page.images.length > 0 && (
                <img
                  src={page.images[0].url}
                  className={`mt-[15px] mr-[6px] ${
                    props.isMyList ? 'h-[6rem] w-[6rem]' : 'h-[8rem] w-[8rem]'
                  } rounded-[5px] object-cover`}
                />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <div ref={props.setTarget} className="h-[1rem]" />
    </>
  );
}
