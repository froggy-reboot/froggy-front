import React from 'react';
import { ReactComponent as Logo } from 'src/assets/logo.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';

interface IFormInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: 'all' });
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex h-[100vh] flex-col items-center bg-white">
      <Logo className="mt-[18.4rem] h-[10rem] w-[20rem] md:mt-[22rem] md:h-[10rem] md:w-[28rem]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[4rem] flex w-[100%] flex-col md:mt-[7rem]">
        <div className="mx-[3.5rem] flex flex-col gap-[0.8rem] md:gap-[1.5rem]">
          <input
            {...register('email', {
              required: true,
              pattern: {
                value:
                  /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                message: '이메일 형식이 올바르지 않습니다.',
              },
            })}
            className="h-[4.8rem] w-[100%] rounded-[0.8rem] bg-black-10 px-[1.6rem] text-Body focus:outline-green-50"
            placeholder="이메일"
          />
          <span className="ml-[1.2rem] text-red">{errors?.email?.message}</span>
          <input
            {...register('password', {
              required: true,
              pattern: {
                value: /.{6,}/,
                message: '비밀번호는 6글자 이상 입력해주세요.',
              },
            })}
            className="h-[4.8rem] w-[100%] rounded-[0.8rem] bg-black-10 px-[1.6rem] text-Body focus:outline-green-50"
            placeholder="비밀번호"
          />
          <span className="ml-[1.2rem] text-red">
            {errors?.password?.message}
          </span>
          <button
            type="submit"
            className={`mt-[1rem] h-[5rem] w-[100%] rounded-[1rem] text-Body text-white md:mt-[2rem] ${
              isValid ? 'bg-green-50' : 'bg-black-30'
            }`}>
            로그인
          </button>
          <hr className=" mt-[3.5rem] w-[100%] overflow-visible border-black-50 text-center text-Callout font-normal text-black-50 after:relative after:bottom-4 after:bg-white after:px-5 after:content-['sns_로그인'] md:mt-[5rem] md:after:text-Tag" />
        </div>
      </form>
      <ul className="mt-[3rem] flex gap-[2rem] md:mt-[4rem] md:gap-[6rem]">
        <li className="h-[5rem] w-[5rem] rounded-full bg-black-10 md:h-[7rem] md:w-[7rem]"></li>
        <li className="h-[5rem] w-[5rem] rounded-full bg-black-10 md:h-[7rem] md:w-[7rem]"></li>
        <li className="h-[5rem] w-[5rem] rounded-full bg-black-10 md:h-[7rem] md:w-[7rem]"></li>
        <li className="h-[5rem] w-[5rem] rounded-full bg-black-10 md:h-[7rem] md:w-[7rem]"></li>
      </ul>
      <p className="absolute bottom-[4rem] my-0 mx-auto text-Callout font-normal text-black-50 md:bottom-[6rem] md:text-Tag">
        froggy는 처음이신가요?
        <Link to={'/'} className="ml-2 text-green-100 md:ml-3">
          회원가입
        </Link>
      </p>
    </div>
  );
}
