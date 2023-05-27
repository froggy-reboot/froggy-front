import React from 'react';
import { useForm } from 'react-hook-form';

export default function ReportPage() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({ mode: 'all' });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container h-real-screen px-[3rem] pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-between gap-[2rem]">
        <div className="mt-[3rem]">
          <label
            htmlFor="content"
            className="mb-[1rem] ml-[0.5rem] inline-block text-Body font-bold">
            신고사유
          </label>
          <textarea
            id="content"
            {...register('content', {
              required: true,
              minLength: 10,
              validate: (value) => {
                return !!value.trim();
              },
            })}
            placeholder="신고 사유를 10글자 이상 입력해주세요."
            className="input h-[25rem] p-[1rem] md:h-[40rem]"
          />
        </div>
        <button
          type="submit"
          className={`submit_btn mb-[2rem] ${
            isValid ? 'bg-green-50' : 'bg-black-30'
          }`}>
          제출하기
        </button>
      </form>
    </div>
  );
}
