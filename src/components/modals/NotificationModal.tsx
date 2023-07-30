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
  const { closeModal } = useModal();
  return (
    <div
      className="modal_bg"
      onClick={() => closeModal(modals.NotificationModal)}>
      <div className="h-[14.375rem] min-h-[230px] w-[18.75rem] min-w-[300px] flex-col justify-center rounded-[0.625rem] bg-white text-center shadow-[1px_2px_5px_1px_rgba(0,0,0,0.20)]">
        <div className="flex justify-end pt-2 pr-2">
          <Close onClick={() => closeModal(modals.NotificationModal)} />
        </div>
        <div className="flex justify-center">
          <div className="h-[5.3rem] min-h-[85px] w-[5.3rem] min-w-[85px]">
            <img src={frogImage} />
          </div>
        </div>
        <div className="pb-4 text-Body font-bold">{title}</div>
        <div className="whitespace-pre-line text-[14px] tracking-[0.42px]">
          {content}
        </div>
      </div>
    </div>
  );
}
