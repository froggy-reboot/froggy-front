import React from 'react';
import { useModal } from 'src/hooks/useModal';
import ConfirmModal from './ConfirmModal';
import { modals } from './Modals';

export default function UpdateDeleteModal() {
  const { openModal, closeModal, showModal } = useModal();

  const updateHandler = () => {
    closeModal(modals.UpdateDeleteModal);
  };

  const deleteHandler = () => {
    closeModal(modals.UpdateDeleteModal);
    openModal(ConfirmModal, {
      postId: showModal[0].props.postId,
      commentId: showModal[0].props.commentId,
    });
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
