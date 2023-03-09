import React from 'react';
import { useModal } from 'src/hooks/useModal';

export default function UpdateDeleteModal(commentId?, postId?) {
  const { closeModal } = useModal();

  const updateHandler = () => {
    //수정 api호출
    closeModal();
  };

  const deleteHandler = () => {
    //삭제 api호출
    closeModal();
  };

  return (
    <div
      className="fixed top-0 flex h-[100vh] w-[100vw] items-center justify-center bg-[rgba(0,0,0,0.2)]"
      onClick={closeModal}>
      <div className="flex h-[6.5rem] w-[6rem] flex-col items-center justify-center gap-[0.4rem] rounded-[15px] bg-white px-[1rem] text-Tag text-black-50 drop-shadow-[0px_1px_3px_rgba(0,0,0,0.1)]">
        <button onClick={updateHandler}>수정</button>
        <hr className="w-[100%] border-black-30" />
        <button onClick={deleteHandler}>삭제</button>
      </div>
    </div>
  );
}
