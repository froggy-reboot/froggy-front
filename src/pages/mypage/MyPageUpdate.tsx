import { getUserInfo } from 'src/apis/authApi';
import { modals } from 'src/components/modals/Modals';
import React, { useRef } from 'react';

import { useModal } from 'src/hooks/useModal';
import { useQuery } from '@tanstack/react-query';

import { SubmitHandler, useForm } from 'react-hook-form';

import ProfileUpdateModal from '@/components/modals/ProfileUpdateModal';

interface IProfile {
  image: string;
  nickname: string;
}

function MyPageUpdate() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const { openModal } = useModal();

  // form 생성
  const { register, handleSubmit, setValue } = useForm<IProfile>({
    mode: 'all',
  });

  // 사진 추가를 위한 Ref 생성
  const fileInput = useRef<HTMLInputElement>(null);

  return (
    <div className="container">
      <form>
        {/* 프로필 이미지 영역 */}
        <input
          accept="image/*"
          className="hidden"
          id="image"
          type="file"
          ref={fileInput}
        />
        <img
          src={data?.data.profileImg}
          alt="profile"
          className="h-[11.875rem] w-[11.875rem] rounded-full bg-[#F5F5F5] object-cover"
          onClick={() => {
            if (fileInput != null) {
              openModal(modals.ProfileUpdateModal, fileInput);
            }
          }}
        />
      </form>
    </div>
  );
}

export default MyPageUpdate;
