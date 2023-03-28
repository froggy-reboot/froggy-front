import React from 'react';
import { deleteArticle, deleteComment } from 'src/apis/boardApi';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { useNavigate } from 'react-router-dom';

export default function ConfirmModal() {
  const { closeModal, showModal } = useModal();
  const navigate = useNavigate();

  const deleteConfirmHandler = async () => {
    closeModal(modals.ConfirmModal);
    if (showModal[0].props.commentId) {
      try {
        const response = await deleteComment(
          showModal[0].props.postId,
          showModal[0].props.commentId,
        );
        if (response.status === 200) {
          alert('댓글을 삭제하였습니다.');
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (!showModal[0].props.commentId) {
      try {
        const response = await deleteArticle(showModal[0].props.postId);
        if (response.status === 200) {
          alert('게시글을 삭제하였습니다.');
          navigate('/board');
        }
      } catch (error) {
        console.log(error);
      }
    }
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
