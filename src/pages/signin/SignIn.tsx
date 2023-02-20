import React from 'react';
import { ReactComponent as Logo } from 'src/assets/logo.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link } from 'react-router-dom';
import {
  SOCIAL_LOGIN,
  ERROR_MESSAGE,
  LOGIN,
  SIGNUP,
  REG_EXP,
} from 'src/pages/signin/SignInConstants';

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
    <div className="container">
      <Logo className="mt-[18.4rem] h-[10rem] w-[20rem] md:mt-[22rem] md:h-[10rem] md:w-[28rem]" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[4rem] flex w-[100%] flex-col md:mt-[7rem]">
        <div className="mx-[3.5rem] flex flex-col gap-[0.8rem] md:gap-[1.5rem]">
          <input
            {...register('email', {
              required: true,
              pattern: {
                value: REG_EXP.EMAIL,
                message: ERROR_MESSAGE.EMAIL,
              },
            })}
            className="input"
            placeholder="이메일"
          />
          <span className="error_message">{errors?.email?.message}</span>
          <input
            {...register('password', {
              required: true,
              pattern: {
                value: REG_EXP.PASSWORD,
                message: ERROR_MESSAGE.PASSWORD,
              },
            })}
            className="input"
            placeholder="비밀번호"
          />
          <span className="error_message">{errors?.password?.message}</span>
          <button
            type="submit"
            className={`submit_btn ${isValid ? 'bg-green-50' : 'bg-black-30'}`}>
            {LOGIN}
          </button>
          <hr className="mt-[3.5rem] w-[100%] overflow-visible border-black-50 text-center text-Callout font-normal text-black-50 after:relative after:bottom-4 after:bg-white after:px-5 after:content-['sns_로그인'] md:mt-[5rem] md:after:text-Tag" />
        </div>
      </form>
      <ul className="mt-[3rem] flex gap-[2rem] md:mt-[4rem] md:gap-[6rem]">
        {SOCIAL_LOGIN.map((social) => {
          return (
            <li
              key={social.id}
              className="h-[5rem] w-[5rem] rounded-full bg-black-10 md:h-[7rem] md:w-[7rem]">
              <img src="" alt={social.type} />
            </li>
          );
        })}
      </ul>
      <p className="absolute bottom-[4rem] my-0 mx-auto text-Callout font-normal text-black-50 md:bottom-[6rem] md:text-Tag">
        {SIGNUP.MESSAGE}
        <Link to={'/'} className="ml-2 text-green-100 md:ml-3">
          {SIGNUP.SIGNUP}
        </Link>
      </p>
    </div>
  );
}
