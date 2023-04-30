import React, { useEffect } from 'react';
import { useModal } from 'src/hooks/useModal';

import { modals } from 'src/components/modals/Modals';
import frogImage from 'src/assets/frog_image.png';

function ProfileUpdateModal(props: any) {
  const { openModal, closeModal, showModal } = useModal();
  const updateHandler = () => {
    closeModal(modals.ProfileUpdateModal);
    props.fileInput.current.click();
  };
  const basicHandler = () => {
    closeModal(modals.ProfileUpdateModal);
    props.setImgSrc(frogImage);
  };
  return (
    <div
      className="modal_bg items-end"
      onClick={() => closeModal(modals.ProfileUpdateModal)}>
      <div className="modal_under">
        <button onClick={updateHandler}>앨범에서 선택</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={basicHandler}>기본 이미지로 변경</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={() => closeModal(modals.ProfileUpdateModal)}>
          취소
        </button>
      </div>
    </div>
  );
}

export default ProfileUpdateModal;
