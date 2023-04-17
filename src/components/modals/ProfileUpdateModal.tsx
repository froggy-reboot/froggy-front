import React from 'react'
import { useModal } from 'src/hooks/useModal';



import { modals } from 'src/components/modals/Modals';

function ProfileUpdateModal() {
  const { openModal, closeModal, showModal } = useModal();
  return (
    <div className="modal_bg items-end"
    onClick={() => closeModal(modals.UpdateDeleteModal)}>
      <div className='modal_under'>
      <button onClick={updateHandler}>앨범에서 선택</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={deleteHandler}>기본 이미지로 변경</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={() => closeModal(modals.UpdateDeleteModal)}>
          취소
        </button>
      </div>
    </div>
  )
}

export default ProfileUpdateModal