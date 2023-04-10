import React, { useState } from 'react';

import { ReactComponent as CloseEye } from 'src/assets/hideeye.svg';
import { ReactComponent as OpenEye } from 'src/assets/open_eye.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ERROR_MESSAGE, REG_EXP } from 'src/pages/signin/SignInConstants';
import { NEXT } from 'src/pages/signup/SignUpConstants';

interface IFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const onClickHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const onClickConfirmHandler = () => {
    setShowPasswordConfirm((showPasswordConfirm) => !showPasswordConfirm);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    clearErrors,
  } = useForm<IFormInput>({ mode: 'all' });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  return (
    <div className="container">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[4rem] flex h-[100vh] w-[100%] flex-col justify-between px-[3rem] md:gap-[1.5rem]">
        <div className="flex flex-col gap-[3px]">
          <p className="mb-[8px] pl-[4px] text-Body text-[#696969]">기본정보</p>
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
          <span className="error_message text-black-50">
            인증가능한 이메일을 입력해주세요.
          </span>
          <span className="error_message">{errors?.email?.message}</span>

          <label className="relative mt-[3rem]">
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
          </label>
          <span className="error_message text-black-50">
            비밀번호는 영문, 숫자를 포함하여 8자 이상으로 설정해주세요.
          </span>
          <span className="error_message">{errors?.password?.message}</span>
          <label className="relative">
            {showPasswordConfirm ? (
              <OpenEye className="input_eye" onClick={onClickConfirmHandler} />
            ) : (
              <CloseEye className="input_eye" onClick={onClickConfirmHandler} />
            )}
            <input
              {...register('passwordConfirm', {
                required: true,
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return ERROR_MESSAGE.PASSWORDCONFIRM;
                  } else {
                    clearErrors('passwordConfirm');
                  }
                },
              })}
              className="input"
              placeholder="비밀번호 확인"
              type={showPasswordConfirm ? 'text' : 'password'}
            />
          </label>
          <span className="error_message text-black-50">
            비밀번호 확인을 위해 한번 더 입력해주세요.
          </span>
          <span className="error_message">
            {errors?.passwordConfirm?.message}
          </span>
        </div>
        <button
          type="submit"
          className={`submit_btn ${
            isValid ? 'bg-green-50' : 'bg-black-30'
          } mb-[2rem] `}>
          {NEXT}
        </button>
      </form>
    </div>
  );
}

export default SignUp;
