import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ERROR_MESSAGE, REG_EXP } from '../signin/SignInConstants';

interface IFormInput {
  email: string;
}

export default function ResetPassward() {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFormInput>({ mode: 'all' });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="container h-real-screen px-[3rem] pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-between gap-[2rem]">
        <div className="mt-[3rem]">
          <p className="mb-[1rem] ml-[0.5rem] text-Body">
            비밀번호 재설정을 위한 메일을 전송해 드립니다.
            <br />
            가입할 때 사용한 이메일을 입력해주세요.
          </p>
          <label
            htmlFor="email"
            className="mt-[2rem] mb-[1rem] ml-[0.5rem] inline-block text-Body font-bold">
            이메일
          </label>
          <input
            {...register('email', {
              required: true,
              pattern: {
                value: REG_EXP.EMAIL,
                message: ERROR_MESSAGE.EMAIL,
              },
            })}
            id="email"
            className="input"
            type="text"
            placeholder="이메일"
          />
          <span className="error_message mt-[1rem] ml-[0.5rem] inline-block">
            {errors?.email?.message}
          </span>
        </div>
        <button
          type="submit"
          className={`submit_btn mb-[2rem] ${
            isValid ? 'bg-green-50' : 'bg-black-30'
          }`}>
          이메일 전송
        </button>
      </form>
    </div>
  );
}
