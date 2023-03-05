import React from 'react';
import { ReactComponent as MenuIcon } from 'src/assets/menu.svg';
import { ReactComponent as LikeIcon } from 'src/assets/empty_like.svg';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';

const dummy = {
  id: 11,
  writer_id: 2,
  liked: 0,
  nickname: 'synodic',
  title: '혹시 이런 뜨개질 해 보신 분 있나요.',
  content: '안녕하세요, 개마입니다. 어쩌고 저쩌고, field의 기본 사이즈',
  created_at: '2023-02-27T15:15:49.695Z',
  deleted_at: 'null',
  post_type: '자유',
  fileList: [
    'https://cdn.pixabay.com/photo/2016/08/23/13/12/knitting-1614283__340.jpg',
    'https://cdn.pixabay.com/photo/2021/11/12/13/14/sweater-6788998_960_720.jpg',
  ],
  comment_count: 3,
};

export default function BoardDetail() {
  return (
    <div className="container">
      <main className="w-[100%] px-[2rem]">
        <div className="mt-[2.2rem] grid grid-cols-[50px_3fr_1fr] items-center">
          <img src="" className="h-[5rem] w-[5rem] rounded-full bg-green-30" />
          <div className="ml-[15px]">
            <p className="text-Tag font-bold">{dummy.nickname}</p>
            <p className="text-Board text-black-50">{dummy.created_at}</p>
          </div>
          <MenuIcon className="justify-self-end" />
        </div>
        <article className="mt-[1.4rem]">
          <h1 className="h-[4rem] text-Body font-bold leading-[4rem]">
            <span className="tag mr-[7px]">{dummy.post_type}</span>
            {dummy.title}
          </h1>
          <p className="min-h-[8rem] text-Tag font-normal">{dummy.content}</p>
          <div className="mx-[1.8rem] my-[1.2rem] flex h-[19.6rem] gap-[1rem] overflow-y-scroll">
            {dummy.fileList.map((src, idx) => (
              <img key={idx} src={src} />
            ))}
          </div>
        </article>
        <p className="mt-[3px] text-Callout">
          <LikeIcon className="mr-[0.3rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
          <span>{dummy.liked}</span>
          <ChatIcon className="mr-[0.3rem] ml-[0.4rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
          <span>{dummy.comment_count}</span>
        </p>
      </main>
    </div>
  );
}
