import React from 'react';
import { ReactComponent as RavelryLogo } from 'src/assets/social/RavelrySecondaryLogo.svg';
import { ReactComponent as CancelBtn } from 'src/assets/cancel_btn.svg';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { getRavelryConnect } from 'src/apis/signInApi';
import axios from 'axios';
import { LOGIN } from 'src/pages/signin/SignInConstants';

export default function RavelryConnectModal() {
  const { closeModal } = useModal();

  const cancelHandler = () => {
    closeModal(modals.RavelryConnectModal);
  };

  const ravelryConnectHandler = async () => {
    try {
      await getRavelryConnect();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 301) {
          window.location.replace(error.response.data);
        } else {
          alert(LOGIN.MESSAGE.ETC);
        }
      }
    }
  };

  return (
    <div className="modal_bg">
      <div className="modal_normal relative gap-[1rem]">
        <CancelBtn
          onClick={cancelHandler}
          className="absolute right-[1rem] top-[1rem]"
        />
        <p className="flex flex-col items-center text-Callout">
          <p>아직 Ravelry연동이 완료되지 않았습니다!</p>
          <p>지금바로 연동할까요?</p>
        </p>
        <button
          onClick={ravelryConnectHandler}
          className="flex h-[4.5rem] w-[29rem] items-center justify-center gap-[1rem] rounded-[10px] bg-[#EE6E62] text-Body font-bold text-white">
          <RavelryLogo />
          <p>Ravelry 로그인</p>
        </button>
      </div>
    </div>
  );
}
