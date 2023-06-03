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
import axios from 'axios';
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

  const onSubmit: SubmitHandler<IFormInput> = async (data: IFormInput) => {
    try {
      setIsLoading(true);
      const response = await postEmailLogin(data);
      if (response.status === 200) {
        localStorage.setItem('userId', JSON.stringify(response.data.user.id));
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        navigate('/');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          alert(LOGIN.MESSAGE[422]);
        }
        if (error.response?.status === 401) {
          alert(LOGIN.MESSAGE[401]);
        } else {
          alert(LOGIN.MESSAGE.ETC);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onClickHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="container h-real-screen justify-between pb-10">
        <div className="m-auto flex w-full flex-col items-center">
          <Logo className="h-[4.5rem] w-[16rem] fill-green-50 md:h-[10rem] md:w-[28rem]" />
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
                  <OpenEye
                    className="input_eye cursor-pointer"
                    onClick={onClickHandler}
                  />
                ) : (
                  <CloseEye
                    className="input_eye cursor-pointer"
                    onClick={onClickHandler}
                  />
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
                className={`submit_btn mt-[2rem] ${
                  isValid ? 'bg-green-50' : 'bg-black-30'
                }`}>
                {LOGIN.LOGIN}
              </button>
              <hr className="mt-[5rem] w-[100%] overflow-visible border-black-50 text-center text-Callout font-normal text-black-50 after:relative after:bottom-4 after:bg-white after:px-5 after:content-['sns_로그인'] md:mt-[5rem] md:after:text-Tag" />
            </div>
          </form>
          <SocialLogin />
        </div>
        <p className="mb-[2rem] text-Tag font-normal text-black-50 md:bottom-[6rem] md:text-Link">
          {SIGNUP.MESSAGE}
          <Link to={'/sign-up'} className="ml-2 text-green-100 md:ml-3">
            {SIGNUP.SIGNUP}
          </Link>
        </p>
        <Link
          to={'/reset-passward'}
          className="ml-2 text-Callout font-normal text-black-50 md:bottom-[6rem] md:ml-3 md:text-Tag">
          비밀번호를 잊으셨나요?
        </Link>
      </div>
    </>
  );
}
