import React from 'react';
import { ReactComponent as LikeIcon } from 'src/assets/empty_like.svg';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';

//더미데이터
const Dummy = [
  {
    post_id: 1,
    type: '질문',
    title: '뜨개질하는 방법 알려주세용',
    author: '개구리master',
    preview: '뜨개질을 잘하는 법은....',
    date: '2023.1.20',
    likeCount: 222,
    commentCount: 10,
  },
  {
    post_id: 2,
    type: '질문',
    title: '뜨개질하는 방법 알려주세용',
    author: '개구리master',
    preview: '뜨개질을 잘하는 법은....',
    date: '2023.1.20',
    likeCount: 222,
    commentCount: 10,
  },
  {
    post_id: 3,
    type: '질문',
    title: '뜨개질하는 방법 알려주세용',
    author: '개구리master',
    preview: '뜨개질을 잘하는 법은....',
    date: '2023.1.20',
    likeCount: 222,
    commentCount: 10,
  },
  {
    post_id: 4,
    type: '질문',
    title: '뜨개질하는 방법 알려주세용',
    author: '개구리master',
    preview: '뜨개질을 잘하는 법은....',
    date: '2023.1.20',
    likeCount: 222,
    commentCount: 10,
  },
  {
    post_id: 5,
    type: '질문',
    title: '뜨개질하는 방법 알려주세용',
    author: '개구리master',
    preview: '뜨개질을 잘하는 법은....',
    date: '2023.1.20',
    likeCount: 222,
    commentCount: 10,
  },
  {
    post_id: 6,
    type: '질문',
    title: '뜨개질하는 방법 알려주세용',
    author: '개구리master',
    preview: '뜨개질을 잘하는 법은....',
    date: '2023.1.20',
    likeCount: 222,
    commentCount: 10,
  },
  {
    post_id: 7,
    type: '질문',
    title: '뜨개질하는 방법 알려주세용',
    author: '개구리master',
    preview: '뜨개질을 잘하는 법은....',
    date: '2023.1.20',
    likeCount: 222,
    commentCount: 10,
  },
];

export default function PostList() {
  return (
    <ul>
      {Dummy.map((post) => (
        <>
          <hr className="border-black-30" />
          <li key={post.post_id} className="mb-[0.7rem] h-[9rem] pl-[0.4rem]">
            <p className="mt-[0.6rem] text-BoardSub font-medium text-black-50">
              {post.author}
            </p>
            <div className="mt-[0.5rem]">
              <span className="mini_btn inline-block h-[1.9rem] w-[3.8rem] text-center text-Board leading-[1.9rem]">
                {post.type}
              </span>
              <p className="ml-[0.9rem] inline-block text-Tag">{post.title}</p>
            </div>
            <p className="mt-[0.3rem] text-Board text-black-50">
              {post.preview}
            </p>
            <div className="mt-[0.8rem] flex justify-between">
              <div>
                <LikeIcon className="mr-[0.3rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
                <span>{post.likeCount}</span>
                <ChatIcon className="mr-[0.3rem] ml-[0.4rem] inline-block h-[1.5rem] w-[1.5rem] fill-black-50" />
                <span>{post.commentCount}</span>
              </div>
              <p className="pr-[0.8rem] text-Board text-black-50">
                {post.date}
              </p>
            </div>
          </li>
        </>
      ))}
    </ul>
  );
}
