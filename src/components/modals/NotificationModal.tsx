import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import frogImage from 'src/assets/frog_image.png';
import { ReactComponent as Close } from 'src/assets/close.svg';

export default function NotificationModal({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const { openModal, closeModal, showModal } = useModal();
  return (
    // modal 배경
    <div
      className="modal_bg"
      onClick={() => closeModal(modals.NotificationModal)}>
      <div className="min-w-[300px] w-[18.75rem] min-h-[230px] h-[14.375rem] bg-white rounded-[0.625rem] flex-col align-center justify-center text-center shadow-[1px 2px 5px 1px rgba(0, 0, 0, 0.20)]">
        <div className="pt-2 pr-2 flex justify-end">
          <Close onClick={() => closeModal(modals.NotificationModal)} />
        </div>
        <div className="flex justify-center">
          <div className="min-w-[85px] min-h-[85px] w-[5.3rem] h-[5.3rem]">
            <img src={frogImage} />
          </div>
        </div>
        <div className="text-Body font-bold pb-4">{title}</div>
        <div className="text-[14px] tracking-[0.42px] whitespace-pre-line">
          {content}
        </div>
      </div>
    </div>
  );
}
