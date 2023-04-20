import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from 'src/apis/authApi';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useRef } from 'react'

interface IProfile {
  image : string
  nickname : string
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
  const fileInput = useRef(null)
  return (
    <div className="container">
      <form>
        {/* 프로필 이미지 영역 */}
        <input accept='image/*' className='hidden' id='image' type='file' ref={fileInput}/>
          <img
            src={data?.data.profileImg}
            alt="profile"
            className="h-[11.875rem] w-[11.875rem] rounded-full bg-[#F5F5F5] object-cover"
            onClick={() => openModal(modals.ProfileUpdateModal)}
            />

      </form>
  </div>
  )
}

export default MyPageUpdate