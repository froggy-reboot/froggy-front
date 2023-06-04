import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  ERROR_MESSAGE,
  LOGIN,
  REG_EXP,
} from 'src/pages/signin/SignInConstants';
import { postPassword } from 'src/apis/mypageApi';
import Loader from 'src/components/loader/Loader';
import axios from 'axios';

interface IFormInput {
  email: string;
}

export default function ResetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<IFormInput>({ mode: 'all' });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      setIsLoading(true);
      const response = await postPassword(data.email);
      if (response.status === 200) {
        alert('비밀번호 재설정을 위한 이메일 전송이 완료되었습니다.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          alert('존재하지 않는 이메일입니다.');
        }
        if (error.response?.status === 404) {
          alert(LOGIN.MESSAGE.ETC);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

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
