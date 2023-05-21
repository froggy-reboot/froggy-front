import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { ReactComponent as CloseEye } from 'src/assets/hideeye.svg';
import { ReactComponent as OpenEye } from 'src/assets/open_eye.svg';
import { useToggle } from 'src/hooks/useToggle';
import { SubmitHandler, useForm } from 'react-hook-form';

interface IFormInput {
  password: string;
}

export default function WithdrawModal() {
  const { closeModal, openModal } = useModal();
  const [isShow, onClickHandler] = useToggle(false);
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFormInput>({ mode: 'all' });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    closeModal(modals.WithdrawModal);
    openModal(modals.WithdrawConfirmModal, {
      password: data.password,
    });
  };

  return (
    <div className="modal_bg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="modal_normal h-[28rem] w-[34rem] p-[2rem]">
        <p className="mb-[1rem]">탈퇴를 원하시면 비밀번호를 입력해주세요.</p>
        <div className="relative w-[100%]">
          {isShow ? (
            <OpenEye className="input_eye" onClick={onClickHandler} />
          ) : (
            <CloseEye className="input_eye" onClick={onClickHandler} />
          )}
          <input
            {...register('password', { required: true })}
            className="input"
            placeholder="비밀번호"
            type={isShow ? 'text' : 'password'}
          />
        </div>
        <button
          type="submit"
          className={`submit_btn mt-0 ${
            isValid ? 'bg-green-50' : 'bg-black-30'
          }`}>
          탈퇴하기
        </button>
        <button
          onClick={() => closeModal(modals.WithdrawModal)}
          type="button"
          className="submit_btn mt-0 bg-green-50">
          취소
        </button>
      </form>
    </div>
  );
}
