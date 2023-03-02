import React, { useState } from 'react';
import { ReactComponent as Logo } from 'src/assets/logo.svg';
import { ReactComponent as CloseEye } from 'src/assets/hideeye.svg';
import { ReactComponent as OpenEye } from 'src/assets/open_eye.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
  ERROR_MESSAGE,
  LOGIN,
  SIGNUP,
  REG_EXP,
} from 'src/pages/signin/SignInConstants';
import SocialLogin from 'src/pages/signin/SocialLogin';
import { postEmailLogin } from 'src/apis/signInApi';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import Loader from 'src/components/loader/Loader';
export interface IFormInput {
  email: string;
  password: string;
}

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInput>({ mode: 'all' });

  const { mutate } = useMutation(postEmailLogin, {
    onMutate: () => {
      setIsLoading(true);
    },
    onSuccess: ({ data }) => {
      localStorage.setItem('token', data.token);
      navigate('/');
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 422) {
        alert(LOGIN.MESSAGE[422]);
      }
      if (error.response?.status === 401) {
        alert(LOGIN.MESSAGE[401]);
      } else {
        alert(LOGIN.MESSAGE.ETC);
      }
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput) => {
    mutate(data);
  };

  const onClickHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="container">
        <Logo className="mt-[20rem] h-[4.5rem] w-[16rem] fill-green-50 md:mt-[22rem] md:h-[10rem] md:w-[28rem]" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[6.5rem] flex w-[100%] flex-col md:mt-[7rem]">
          <div className="mx-[2.5rem] flex flex-col gap-[0.5rem] px-[1rem] md:gap-[1.5rem]">
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
            <div className="relative">
              {showPassword ? (
                <OpenEye className="input_eye" onClick={onClickHandler} />
              ) : (
                <CloseEye className="input_eye" onClick={onClickHandler} />
              )}
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
                type={showPassword ? 'text' : 'password'}
              />
            </div>
            <span className="error_message">{errors?.password?.message}</span>
            <button
              type="submit"
              className={`submit_btn ${
                isValid ? 'bg-green-50' : 'bg-black-30'
              }`}>
              {LOGIN.LOGIN}
            </button>
            <hr className="mt-[5rem] w-[100%] overflow-visible border-black-50 text-center text-Callout font-normal text-black-50 after:relative after:bottom-4 after:bg-white after:px-5 after:content-['sns_로그인'] md:mt-[5rem] md:after:text-Tag" />
          </div>
        </form>
        <SocialLogin />
        <p className="absolute bottom-[4rem] my-0 mx-auto text-Callout font-normal text-black-50 md:bottom-[6rem] md:text-Tag">
          {SIGNUP.MESSAGE}
          <Link to={'/sign-up'} className="ml-2 text-green-100 md:ml-3">
            {SIGNUP.SIGNUP}
          </Link>
        </p>
      </div>
    </>
  );
}
