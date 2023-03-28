import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as SearchIcon } from 'src/assets/search.svg';
import { ReactComponent as AlarmIcon } from 'src/assets/alarm.svg';
import { ReactComponent as PlusIcon } from 'src/assets/plus.svg';
import { ReactComponent as FilterIcon } from 'src/assets/filter.svg';
import PostList from 'src/components/board/PostList';
import SearchView from 'src/components/board/SearchView';
import { articleTypeList } from 'src/pages/board/BoardConstants';
import { useToggle } from 'src/hooks/useToggle';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';

interface IFormInput {
  search: string;
}

export default function BoardMain() {
  const [showSearch, setShowSearch] = useState(false);
  const [isRecent, sortToggleHandler] = useToggle(true);
  const [isExpanded, articleBtnExpandHandler] = useToggle(false);
  const [ariticleType, setArticleType] = useState('전체');
  const { openModal, closeModal, showModal } = useModal();

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

  const articleTypeHandler = (type: string) => {
    setArticleType(type);
  };

  return (
    <div className="container">
      <nav className="fixed h-[11.9rem] bg-white px-[1.6rem] md:w-[76.8rem]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-[2rem] flex items-center">
            <input
              {...register('search')}
              onFocus={() => setShowSearch(true)}
              onBlur={() => setShowSearch(false)}
              placeholder="검색"
              className="input h-[3.5rem] w-[31rem] pl-[3rem] placeholder:text-black-50 focus:outline-none md:w-[100%]"
            />
            <SearchIcon className="absolute ml-[0.7rem] h-[2rem] w-[2rem]" />
            <AlarmIcon className="ml-[1.3rem] h-[3.5rem] w-[3.5rem] fill-white" />
          </div>
        </form>
        {!showSearch && (
          <div className="mt-[1.8rem] flex justify-between">
            <button onClick={sortToggleHandler} className="mini_btn">
              {isRecent ? '최신글' : '인기글'}
            </button>
            <div>
              {!isExpanded && (
                <button
                  onClick={articleBtnExpandHandler}
                  className="mini_btn flex items-center justify-center">
                  {ariticleType}
                  <FilterIcon className="ml-[5px]" />
                </button>
              )}
              {isExpanded && (
                <div
                  onClick={articleBtnExpandHandler}
                  className="mini_btn flex h-[9rem] w-[6.5rem] flex-col items-center justify-center gap-[0.3rem]">
                  {articleTypeList.map((type, idx) => (
                    <button key={type} onClick={() => articleTypeHandler(type)}>
                      {type}
                      {idx !== articleTypeList.length - 1 && (
                        <hr className="mt-[0.3rem] w-[4.5rem] border-white" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
      <main className="w-[100%] px-[1.6rem] pt-[11.9rem]">
        {showSearch ? <SearchView /> : <PostList />}
      </main>
      {!showSearch && (
        <button
          className={`fixed bottom-[11rem] right-[2.1rem] z-10 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-full shadow-[1px_2px_5px_1px_rgba(0,0,0,0.25)] ${
            showModal.length ? 'bg-white' : 'bg-green-50 '
          }`}
          onClick={
            showModal.length
              ? () => closeModal(modals.CreatePostModal)
              : () => openModal(modals.CreatePostModal)
          }>
          <PlusIcon
            className={`${
              showModal.length ? 'rotate-45 fill-green-50' : ' fill-white'
            }`}
          />
        </button>
      )}
    </div>
  );
}
