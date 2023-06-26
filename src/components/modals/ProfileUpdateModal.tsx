import React from 'react';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import frogImage from 'src/assets/frog_image.png';
import { useSetRecoilState } from 'recoil';
import { isProfileAtom } from 'src/atoms/atom';

// eslint-disable-next-line
export default function ProfileUpdateModal(props: any) {
  const { closeModal } = useModal();
  const setIsProfile = useSetRecoilState(isProfileAtom);

  const updateHandler = () => {
    closeModal(modals.ProfileUpdateModal);
    setIsProfile({
      isCustom: true,
      isDefault: false,
    });
  };

  const basicHandler = () => {
    closeModal(modals.ProfileUpdateModal);
    props.setImagePreview(frogImage);
    setIsProfile({
      isCustom: false,
      isDefault: true,
    });
  };

  return (
    <div
      className="modal_bg items-end"
      onClick={() => closeModal(modals.ProfileUpdateModal)}>
      <div className="modal_under">
        <button className="modal_under_btn" onClick={updateHandler}>
          앨범에서 선택
        </button>
        <hr className="w-[100%] border-black-30" />
        <button className="modal_under_btn" onClick={basicHandler}>
          기본 이미지로 변경
        </button>
        <hr className="w-[100%] border-black-30" />
        <button
          className="modal_under_btn"
          onClick={() => closeModal(modals.ProfileUpdateModal)}>
          취소
        </button>
      </div>
    </div>
  );
}
