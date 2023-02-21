import React, { useState } from 'react';
import { ReactComponent as Back } from 'src/assets/back.svg';
import { ReactComponent as Eye } from 'src/assets/hideeye.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ERROR_MESSAGE, REG_EXP } from 'src/pages/signin/SignInConstants';
import { NEXT } from 'src/pages/signup/SignUpConstants';

interface IFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignUp() {
  const [showPassword, setshowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    getValues,
  } = useForm<IFormInput>({ mode: 'all' });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <div className="container">
      <div className="ml-5 flex w-full items-center justify-start">
        <Back />
        <p className="text-Navbar">회원가입</p>
      </div>
      <hr className="mt-[1rem] w-[100%] overflow-visible border-black-50" />
      <div className="mt-[2.5rem]  w-[100%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[6.5rem] flex w-[100%] flex-col md:mt-[7rem]">
          <div className="mx-[2.5rem] flex flex-col px-[1rem] md:gap-[1.5rem]">
            <p className="text-Body">기본정보</p>
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
              name="email"
              id="email"
            />
            <span className="error_message">{errors?.email?.message}</span>
            <div className="flex flex-col mt-[3rem] gap-[0.5rem]">
              <label className="relative ">
                <Eye
                  className="w-8 h-8 absolute top-1/2 transform -translate-y-1/2 right-3"
                  onClick={() => setshowPassword(!showPassword)}
                />
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
              </label>
              <span className="error_message">{errors?.password?.message}</span>
              <input
                {...register('passwordConfirm', {
                  required: true,
                  validate: {
                    messages: (val: string) =>
                      watch('password') !== watch('passwordConfirm') &&
                      getValues('passwordConfirm') &&
                      ERROR_MESSAGE.PASSWORDCONFIRM,
                  },
                })}
                className="input"
                placeholder="비밀번호 확인"
              />
              <span className="error_message">
                {errors?.passwordConfirm?.message}
              </span>
            </div>
            <button
              type="submit"
              className={`submit_btn ${
                isValid ? 'bg-green-50' : 'bg-black-30'
              }`}>
              {NEXT}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
