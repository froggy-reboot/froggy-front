import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { useResetRecoilState } from 'recoil';
import { editCommentAtom } from 'src/atoms/atom';
import { useMatch, useNavigate } from 'react-router-dom';

export default function StopEditModal() {
  const navigate = useNavigate();
  const { closeModal, showModal } = useModal();
  const completeEditComment = useResetRecoilState(editCommentAtom);
  const boardEditPath = useMatch('/board/edit/:postId');

  const stopEditHandler = () => {
    completeEditComment();
    closeModal(modals.StopEditModal);
    if (showModal[0].props.isPostEdit) {
      navigate(`/board/${boardEditPath?.params.postId}`);
    }
  };

  return (
    <div className="modal_bg">
      <div className="modal_normal">
        <p className="font-medium">수정사항을 삭제할까요?</p>
        <div className="flex gap-[25px] font-bold">
          <button
            onClick={stopEditHandler}
            className="h-[3.5rem] w-[9.5rem] rounded-[20px] bg-green-30 text-white">
            삭제
          </button>
          <button
            onClick={() => closeModal(modals.StopEditModal)}
            className="h-[3.5rem] w-[9.5rem] rounded-[20px] bg-black-10">
            계속 작성
          </button>
        </div>
      </div>
    </div>
  );
}
