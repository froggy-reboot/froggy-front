import React from 'react';
import { useModal } from 'src/hooks/useModal';
import ConfirmModal from 'src/components/modals/ConfirmModal';
import { modals } from 'src/components/modals/Modals';
import { getArticleDetail, getCommet } from 'src/apis/boardApi';
import { useSetRecoilState } from 'recoil';
import { editCommentAtom } from 'src/atoms/atom';
import { useNavigate } from 'react-router-dom';

export default function UpdateDeleteModal() {
  const { openModal, closeModal, showModal } = useModal();
  const setEditComment = useSetRecoilState(editCommentAtom);
  const navigate = useNavigate();

  const updateHandler = async () => {
    closeModal(modals.UpdateDeleteModal);
    try {
      if (showModal[0].props.commentId) {
        const response = await getCommet(
          showModal[0].props.postId,
          showModal[0].props.commentId,
        );
        if (response.status === 200) {
          setEditComment({
            content: response.data.content,
            commentId: showModal[0].props.commentId,
          });
        }
      }
      if (!showModal[0].props.commentId) {
        const response = await getArticleDetail(showModal[0].props.postId);
        if (response.status === 200) {
          navigate(`/board/edit/${showModal[0].props.postId}`, {
            state: response.data,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
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
      className="modal_bg h-real-screen items-end"
      onClick={() => closeModal(modals.UpdateDeleteModal)}>
      <div className="modal_under">
        <button className="modal_under_btn" onClick={updateHandler}>
          수정하기
        </button>
        <hr className="w-[100%] border-black-30" />
        <button className="modal_under_btn" onClick={deleteHandler}>
          삭제하기
        </button>
        <hr className="w-[100%] border-black-30" />
        <button
          className="modal_under_btn"
          onClick={() => closeModal(modals.UpdateDeleteModal)}>
          취소
        </button>
      </div>
    </div>
  );
}
