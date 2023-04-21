import React, { useEffect } from 'react';
import { useModal } from 'src/hooks/useModal';

import { modals } from 'src/components/modals/Modals';

function ProfileUpdateModal(props: any) {
  useEffect(() => {
    console.log(props);
  }, []);
  const { openModal, closeModal, showModal } = useModal();
  const updateHandler = () => {
    closeModal(modals.ProfileUpdateModal);
    props.current.click();
  };
  const basicHandler = () => {
    closeModal(modals.ProfileUpdateModal);
    console.log('basic');
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
