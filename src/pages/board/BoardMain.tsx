import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ReactComponent as SearchIcon } from 'src/assets/search.svg';
import { ReactComponent as AlarmIcon } from 'src/assets/alarm.svg';

interface IFormInput {
  search: string;
}

export default function BoardMain() {
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
    <>
      <div className="container">
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
      </div>
    </>
  );
}
