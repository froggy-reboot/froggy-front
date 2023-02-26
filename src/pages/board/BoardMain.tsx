import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as SearchIcon } from 'src/assets/search.svg';
import { ReactComponent as AlarmIcon } from 'src/assets/alarm.svg';
import { ReactComponent as LikeIcon } from 'src/assets/empty_like.svg';
import { ReactComponent as ChatIcon } from 'src/assets/chat.svg';
import { ReactComponent as PlusIcon } from 'src/assets/plus.svg';

interface IFormInput {
  search: string;
}
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

export default function BoardMain() {
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, reset, formState } = useForm<IFormInput>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ search: '' });
    }
  }, [formState]);

  return (
    <div className="container">
      <nav className="fixed h-[11.9rem] w-[100%] bg-white px-[1.6rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[2rem] flex items-center">
            <input
              {...register('search')}
              placeholder="검색"
              className="input h-[3.5rem] w-[31rem] pl-[3rem] placeholder:text-black-50 focus:outline-none"
            />
            <SearchIcon className="absolute ml-[0.7rem] h-[2rem] w-[2rem]" />
            <AlarmIcon className="ml-[1.3rem] h-[3.5rem] w-[3.5rem] fill-white" />
          </div>
        </form>
        <div className="mt-[1.8rem] flex w-[100%] justify-between">
          <button className="mini_btn">인기글</button>
          <button className="mini_btn">전체</button>
        </div>
      </nav>
      <main className="w-[100%] px-[1.6rem] pt-[11.9rem]">
        <ul>
          {Dummy.map((post) => (
            <>
              <hr className="border-black-30" />
              <li
                key={post.post_id}
                className="mb-[0.7rem] h-[9rem] pl-[0.4rem]">
                <p className="mt-[0.6rem] text-BoardSub font-medium text-black-50">
                  {post.author}
                </p>
                <div className="mt-[0.5rem]">
                  <span className="mini_btn inline-block h-[1.9rem] w-[3.8rem] text-center text-Board leading-[1.9rem]">
                    {post.type}
                  </span>
                  <p className="ml-[0.9rem] inline-block text-Tag">
                    {post.title}
                  </p>
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
      </main>
      <button
        className={`fixed bottom-[11rem] right-[2.1rem] flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full shadow-[1px_2px_5px_1px_rgba(0,0,0,0.20)] ${
          showModal ? 'bg-white' : 'bg-green-50 '
        }`}
        onClick={() => setShowModal((isShow) => !isShow)}>
        <PlusIcon
          className={`${showModal ? 'rotate-45 fill-green-50' : ' fill-white'}`}
        />
      </button>
      {showModal && (
        <div className="fixed bottom-[17.3rem] right-[2.1rem] flex h-[8.5rem] w-[7.5rem] flex-col items-center justify-center gap-[0.9rem] rounded-[1.5rem] bg-green-50 shadow-[1px_2px_5px_1px_rgba(0,0,0,0.20)]">
          <p className="text-Body font-medium text-white">질문글</p>
          <hr className="w-[5.5rem] border-white" />
          <p className="text-Body font-medium text-white">자유글</p>
        </div>
      )}
    </div>
  );
}
