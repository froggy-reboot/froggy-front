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
  const [showPasswordConfirm, setshowPasswordConfirm] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    clearErrors
  } = useForm<IFormInput>({ mode: 'all' });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

  };
  return (
    <div className="container">

      <hr className="mt-[1rem] w-[100%] overflow-visible border-black-50" />
      <div className="mt-[2.5rem]  w-[100%]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-[6.5rem] flex w-[100%] flex-col md:mt-[7rem]">
          <div className="mx-[2.5rem] flex flex-col px-[1rem] md:gap-[1.5rem]">
            <p className="mb-2 text-Body">기본정보</p>
            {/* 이메일 */}
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

            {/* 비밀번호 */}
            <div className="mt-[3rem] flex flex-col gap-[0.5rem]">
              <label className="relative ">
                <Eye
                  className="absolute top-1/2 right-3 h-8 w-8 -translate-y-1/2"
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

              {/* 비밀번호 확인 */}
              <label className="relative">
                <Eye
                  className="absolute top-1/2 right-3 h-8 w-8 -translate-y-1/2"
                  onClick={() => setshowPasswordConfirm(!showPasswordConfirm)}
                />
                <input
                  {...register('passwordConfirm', {
                    required: true,
                    validate: (val: string) => {
                      if (watch('password') != val) {
                        return ERROR_MESSAGE.PASSWORDCONFIRM
                      }
                      else {
                        clearErrors('passwordConfirm')
                      }
                    },
                  })}
                  className="input"
                  placeholder="비밀번호 확인"
                  type={showPasswordConfirm ? 'text' : 'password'}
                />
              </label>
              <span className="error_message">{errors?.passwordConfirm?.message}</span>
            </div>
            <button
              type="submit"
              className={`submit_btn ${isValid ? 'bg-green-50' : 'bg-black-30'
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
