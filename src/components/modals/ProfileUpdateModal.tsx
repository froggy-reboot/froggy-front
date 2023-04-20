import React from 'react';
import { useModal } from 'src/hooks/useModal';

import { modals } from 'src/components/modals/Modals';

function ProfileUpdateModal() {
  const { openModal, closeModal, showModal } = useModal();
  const updateHandler = () => {
<<<<<<< HEAD
    console.log("hello")
  }
  const deleteHandler = () => {
    // fileInput.current.click()
    console.log("hello")
  }
  return (
    <div className="modal_bg items-end"
    onClick={() => closeModal(modals.ProfileUpdateModal)}>
      <div className='modal_under'>
      <button onClick={updateHandler}>앨범에서 선택</button>
=======
    closeModal(modals.ProfileUpdateModal);
    console.log('update');
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
>>>>>>> e0fdb54710c28cd7828e564daea8179ac6f16c0f
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
