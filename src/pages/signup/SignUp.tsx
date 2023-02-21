import React from 'react';
import { ReactComponent as Back } from 'src/assets/back.svg'
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ERROR_MESSAGE,
  REG_EXP,
} from 'src/pages/signin/SignInConstants';
import {
  NEXT
} from 'src/pages/signup/SignUpConstants';

interface IFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignUp() {
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
      <div className="ml-5 flex w-full items-center justify-start">
        <Back />
        <p className='text-Navbar'>회원가입</p>
      </div>
      <hr className="mt-4 w-[100%] overflow-visible border-black-50" />
      <div className="mt-10  w-[100%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[6.5rem] flex w-[100%] flex-col md:mt-[7rem]">
          <div className="mx-[2.5rem] flex flex-col gap-[0.5rem] px-[1rem] md:gap-[1.5rem]">
            <p className='text-Body'>기본정보</p>
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
            <input
              {...register('passwordConfirm', {
                required: true,
                pattern: {
                  value: REG_EXP.PASSWORD,
                  message: ERROR_MESSAGE.PASSWORD,
                },
              })}
              className="input"
              placeholder="비밀번호 확인"
            />
            <span className="error_message">{errors?.password?.message}</span>
            <button
              type="submit"
              className={`submit_btn ${isValid ? 'bg-green-50' : 'bg-black-30'}`}>
              {NEXT}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp