import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { modals } from './Modals';

export default function UpdateDeleteModal() {
  const { closeModal, showModal } = useModal();

  /*   //commentId 호출할때 보내기
  console.log(showModal[0].props.commentId); */

  const updateHandler = () => {
    //수정 api호출
    closeModal(modals.UpdateDeleteModal);
  };

  const deleteHandler = () => {
    //삭제 api호출
    closeModal(modals.UpdateDeleteModal);
    console.log(showModal);
  };

  return (
    <div
      className="modal_bg items-end"
      onClick={() => closeModal(modals.UpdateDeleteModal)}>
      <div className="flex h-[20rem] w-[100%] flex-col items-center justify-center gap-[1.5rem] rounded-[15px_15px_0px_0px] bg-white px-[1rem] pb-[2rem] text-[17px] font-bold text-black-100 drop-shadow-[0px_-1px_3px_rgba(0,0,0,0.15)]">
        <button onClick={updateHandler}>수정하기</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={deleteHandler}>삭제하기</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={() => closeModal(modals.UpdateDeleteModal)}>
          취소
        </button>
      </div>
    </div>
  );
}
