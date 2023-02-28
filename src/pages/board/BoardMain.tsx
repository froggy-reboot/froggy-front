import React, { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as SearchIcon } from 'src/assets/search.svg';
import { ReactComponent as AlarmIcon } from 'src/assets/alarm.svg';
import { ReactComponent as PlusIcon } from 'src/assets/plus.svg';
import PostList from 'src/components/board/PostList';
import SearchView from 'src/components/board/SearchView';

interface IFormInput {
  search: string;
}

export default function BoardMain() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

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

  const showModalHandler = () => {
    setShowModal((isShow) => !isShow);
  };

  const closeModalHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (!modalRef.current?.contains(event.target as HTMLButtonElement)) {
      setShowModal((isShow) => !isShow);
    }
  };

  return (
    <div className="container">
      <nav className="fixed h-[11.9rem] w-[100%] bg-white px-[1.6rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[2rem] flex items-center">
            <input
              {...register('search')}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
              placeholder="검색"
              className="input h-[3.5rem] w-[31rem] pl-[3rem] placeholder:text-black-50 focus:outline-none"
            />
            <SearchIcon className="absolute ml-[0.7rem] h-[2rem] w-[2rem]" />
            <AlarmIcon className="ml-[1.3rem] h-[3.5rem] w-[3.5rem] fill-white" />
          </div>
        </form>
        {!showSearch && (
          <div className="mt-[1.8rem] flex w-[100%] justify-between">
            <button className="mini_btn">인기글</button>
            <button className="mini_btn">전체</button>
          </div>
        )}
      </nav>
      <main className="w-[100%] px-[1.6rem] pt-[11.9rem]">
        {showSearch ? <SearchView /> : <PostList />}
      </main>
      {!showSearch && (
        <button
          className={`fixed bottom-[11rem] right-[2.1rem] z-[1] flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full shadow-[1px_2px_5px_1px_rgba(0,0,0,0.25)] ${
            showModal ? 'bg-white' : 'bg-green-50 '
          }`}
          onClick={showModalHandler}>
          <PlusIcon
            className={`${
              showModal ? 'rotate-45 fill-green-50' : ' fill-white'
            }`}
          />
        </button>
      )}
      {showModal && (
        <div
          className="fixed top-0 h-[100vh] w-[100vw] bg-[rgba(0,0,0,0.2)]"
          onClick={closeModalHandler}>
          <div
            ref={modalRef}
            className="fixed bottom-[17.3rem] right-[2.1rem] flex h-[8.5rem] w-[7.5rem] flex-col items-center justify-center gap-[0.9rem] rounded-[1.5rem] bg-green-50 shadow-[1px_2px_5px_1px_rgba(0,0,0,0.20)]">
            <p className="text-Body font-medium text-white">질문글</p>
            <hr className="w-[5.5rem] border-white" />
            <p className="text-Body font-medium text-white">자유글</p>
          </div>
        </div>
      )}
    </div>
  );
}
