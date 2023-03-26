import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

export default function CommandNavBar() {
  const { register, handleSubmit, formState, reset } = useForm<{
    comment: string;
  }>();

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ comment: '' });
    }
  }, [formState]);

  const onSubmit: SubmitHandler<{ comment: string }> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-[100%] px-[2.5rem]">
      <img
        src={''}
        alt="프로필"
        className="mr-[1rem] h-[3.2rem] w-[3.2rem] rounded-full bg-green-10"
      />
      <input
        {...register('comment', { required: true })}
        className="h-[3rem] w-[100%] rounded-[15px] bg-black-30 pl-[1.3rem] text-Tag font-normal outline-none placeholder:text-black-50"
        placeholder="댓글을 입력해 주세요."
      />
    </form>
  );
}
