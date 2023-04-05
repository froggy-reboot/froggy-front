import React from 'react';
import { deleteArticle, deleteComment } from 'src/apis/boardApi';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function ConfirmModal() {
  const queryClient = useQueryClient();
  const { closeModal, showModal } = useModal();
  const navigate = useNavigate();

  const { mutate: delCommentMutation } = useMutation(deleteComment, {
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const { mutate: delArticleMutation } = useMutation(deleteArticle, {
    onSuccess: () => {
      alert('게시글을 삭제하였습니다.');
      navigate('/board');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] });
    },
  });

  const deleteConfirmHandler = async () => {
    closeModal(modals.ConfirmModal);
    if (showModal[0].props.commentId) {
      delCommentMutation({
        postId: showModal[0].props.postId,
        commentId: showModal[0].props.commentId,
      });
      if (!showModal[0].props.commentId) {
        delArticleMutation(showModal[0].props.postId);
      }
    }
  };

  const cancelHandler = () => {
    closeModal(modals.ConfirmModal);
  };

  return (
    <div className="modal_bg">
      <div className="modal_normal">
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
