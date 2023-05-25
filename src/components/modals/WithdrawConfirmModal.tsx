import React, { useState } from 'react';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { useNavigate } from 'react-router-dom';
import { postWithdraw } from 'src/apis/mypageApi';
import Loader from 'src/components/loader/Loader';
import axios from 'axios';
import { LOGIN } from 'src/pages/signin/SignInConstants';
import { useQueryClient } from '@tanstack/react-query';

export default function WithdrawConfirmModal() {
  const { closeModal, showModal } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteConfirmHandler = async () => {
    try {
      setIsLoading(true);
      const response = await postWithdraw(showModal[0].props.password);
      if (response.status === 200) {
        localStorage.clear();
        queryClient.clear();
        alert('탈퇴가 완료되었습니다.');
        navigate('/sign-in');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          alert('비밀번호가 일치하지 않습니다.');
        } else {
          alert(LOGIN.MESSAGE.ETC);
        }
      }
    } finally {
      setIsLoading(false);
      closeModal(modals.WithdrawConfirmModal);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="modal_bg">
      <div className="modal_normal h-[18rem] gap-[1rem]">
        <p className="font-bold">정말로 탈퇴하시겠습니까?</p>
        <p className="error_message text-center text-Tag text-black-50">
          탈퇴 후에도 작성하신 글과 댓글은 삭제되지 않습니다.
          <br />
          원치않으시면 삭제 후 탈퇴를 진행해주세요.
        </p>
        <div className="mt-[1rem] flex gap-[25px] font-bold">
          <button
            onClick={deleteConfirmHandler}
            className="h-[3.5rem] w-[9.5rem] rounded-[20px] bg-green-30 text-white">
            탈퇴
          </button>
          <button
            onClick={() => closeModal(modals.WithdrawConfirmModal)}
            className="h-[3.5rem] w-[9.5rem] rounded-[20px] bg-black-10">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
