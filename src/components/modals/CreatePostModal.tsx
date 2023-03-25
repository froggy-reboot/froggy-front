import { useModal } from 'src/hooks/useModal';
import React from 'react';
import { modals } from 'src/components/modals/Modals';

export default function CreatPostModal() {
  const { closeModal } = useModal();

  const onClickHandler = (type: string) => {
    //타입이랑 글작성페이지로 보내기
    console.log(type);
    closeModal(modals.CreatePostModal);
  };

  return (
    <div
      className="modal_bg"
      onClick={() => closeModal(modals.CreatePostModal)}>
      <div className="fixed bottom-[17.3rem] right-[2.1rem] flex h-[8.5rem] w-[7.5rem] flex-col items-center justify-center gap-[0.9rem] rounded-[1.5rem] bg-green-50 shadow-[1px_2px_5px_1px_rgba(0,0,0,0.20)]">
        <button
          onClick={() => onClickHandler('질문')}
          className="text-Body font-medium text-white">
          질문글
        </button>
        <hr className="w-[5.5rem] border-white" />
        <button
          onClick={() => onClickHandler('자유')}
          className="text-Body font-medium text-white">
          자유글
        </button>
      </div>
    </div>
  );
}
