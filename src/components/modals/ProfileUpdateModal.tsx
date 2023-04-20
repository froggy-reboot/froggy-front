import React from 'react'
import { useModal } from 'src/hooks/useModal';



import { modals } from 'src/components/modals/Modals';

function ProfileUpdateModal() {
  const { openModal, closeModal, showModal } = useModal();
  const updateHandler = () => {
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
        <hr className="w-[100%] border-black-30" />
        <button onClick={deleteHandler}>기본 이미지로 변경</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={() => closeModal(modals.ProfileUpdateModal)}>
          취소
        </button>
      </div>
    </div>
  )
}

export default ProfileUpdateModal