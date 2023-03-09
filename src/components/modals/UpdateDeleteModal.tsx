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
      className="modal_bg"
      onClick={() => closeModal(modals.UpdateDeleteModal)}>
      <div className="flex h-[6.5rem] w-[6rem] flex-col items-center justify-center gap-[0.4rem] rounded-[15px] bg-white px-[1rem] text-Tag text-black-50 drop-shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
        <button onClick={updateHandler}>수정</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={deleteHandler}>삭제</button>
      </div>
    </div>
  );
}
