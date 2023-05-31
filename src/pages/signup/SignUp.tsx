import React, { useState } from 'react';
import { ReactComponent as CloseEye } from 'src/assets/hideeye.svg';
import { ReactComponent as OpenEye } from 'src/assets/open_eye.svg';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  ERROR_MESSAGE,
  LOGIN,
  REG_EXP,
} from 'src/pages/signin/SignInConstants';
import { postCheckEmail, postRegister } from 'src/apis/signUpApi';
import { useNavigate } from 'react-router-dom';

export interface ISignUpFormInput {
  email: string;
  password: string;
  passwordConfirm: string;
}

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    clearErrors,
  } = useForm<ISignUpFormInput>({ mode: 'all' });
  const navigate = useNavigate();

  const onClickHandler = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const onClickConfirmHandler = () => {
    setShowPasswordConfirm((showPasswordConfirm) => !showPasswordConfirm);
  };

  const onSubmit: SubmitHandler<ISignUpFormInput> = async (data) => {
    try {
      const response = await postCheckEmail(data);
      if (response.status === 200) {
        if (response.data.isExistEmail === 'N') {
          const registerRes = await postRegister(data);
          if (registerRes.status === 201) {
            alert(
              '이메일인증 후 회원가입이 완료됩니다! 이메일을 확인해주세요.',
            );
            navigate('/sign-in');
          } else {
            alert(LOGIN.MESSAGE.ETC);
          }
        } else {
          alert('이미 존재하는 이메일입니다. 로그인해주세요.');
          navigate('/sign-in');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container h-real-screen pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-[4rem] flex h-full w-[100%] flex-col justify-between px-[3rem] md:gap-[1.5rem]">
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
          } mb-[2rem]`}>
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
