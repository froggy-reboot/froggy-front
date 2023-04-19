import MypageProfileImage from 'src/components/mypage/MypageProfileImage';
import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';

function MyPageUpdate() {
  const { openModal } = useModal();
  return (
    <div
      className="container"
      onClick={() => {
        openModal(modals.ProfileUpdateModal);
      }}>
      <MypageProfileImage />
    </div>
  );
}

export default MyPageUpdate;
