import React from 'react';
import { deleteArticle, deleteComment } from 'src/apis/boardApi';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';

export default function ConfirmModal() {
  const { closeModal, showModal } = useModal();
  const deleteConfirmHandler = () => {
    if (showModal[0].props.commentId) {
      try {
        deleteComment(showModal[0].props.postId, showModal[0].props.commentId);
      } catch (error) {
        console.log(error);
      }
    }
    if (!showModal[0].props.commentId) {
      try {
        deleteArticle(showModal[0].props.postId);
      } catch (error) {
        console.log(error);
      }
    }

    closeModal(modals.ConfirmModal);
  };

  const cancelHandler = () => {
    closeModal(modals.ConfirmModal);
  };

  return (
    <div className="modal_bg">
      <div className="flex h-[12.5rem] w-[32rem] flex-col items-center justify-center gap-[15px] rounded-[10px] bg-white text-Link shadow-[1px_2px_5px_rgba(0,0,0,0.2)] ">
        <p className="font-medium">정말로 삭제하시겠습니까?</p>
        <div className="flex gap-[25px] font-bold">
          <button
            onClick={deleteConfirmHandler}
            className="h-[3.5rem] w-[9.5rem] rounded-[20px] bg-green-30 text-white">
            삭제
          </button>
          <button
            onClick={cancelHandler}
            className="h-[3.5rem] w-[9.5rem] rounded-[20px] bg-black-10">
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
