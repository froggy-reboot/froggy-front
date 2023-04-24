import { getUserInfo } from 'src/apis/authApi';
import { modals } from 'src/components/modals/Modals';
import React, { useRef, useEffect } from 'react';

import { ReactComponent as Refresh } from 'src/assets/refresh.svg';
import { useModal } from 'src/hooks/useModal';
import { useQuery } from '@tanstack/react-query';

import { SubmitHandler, useForm } from 'react-hook-form';

import ProfileUpdateModal from '@/components/modals/ProfileUpdateModal';
import { getRandomNickname } from 'src/apis/authApi';

interface IProfile {
  image: string;
  nickname: string;
}

function MyPageUpdate() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const { openModal } = useModal();

  // form 생성
  const { handleSubmit, setValue, watch } = useForm<IProfile>({
    mode: 'all',
  });

  // 사진 추가를 위한 Ref 생성
  const fileInput = useRef<HTMLInputElement>(null);

  const newNickname = watch('nickname');
  // 닉네임 랜덤 refresh
  const refreshHandler = async () => {
    try {
      const response = await getRandomNickname();
      console.log(response);
      const randomNickname = response.data.nickname;
      setValue('nickname', randomNickname, { shouldDirty: true });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // console.log(newNickname);
    setValue('nickname', newNickname);
  }, [setValue, newNickname]);
  // form submit
  const onSubmit: SubmitHandler<IProfile> = (data) => {
    console.log(data);
  };
  return (
    <div className="container">
      <form className="w-[100%]" onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-[2.5rem] flex flex-col gap-[0.5rem] px-[1rem] md:gap-[1.5rem]">
          {/* 프로필 이미지 영역 */}
          <input
            accept="image/*"
            className="hidden "
            id="image"
            type="file"
            ref={fileInput}
            name="image"
          />
          <img
            src={data?.data.profileImg}
            alt="profile"
            className="mx-auto h-[11.875rem] w-[11.875rem] rounded-full bg-[#F5F5F5] object-cover"
            onClick={() => {
              if (fileInput != null) {
                openModal(modals.ProfileUpdateModal, fileInput);
              }
            }}
          />

          {/* 프로필 닉네임 영역 */}
          <div className="mt-[1.5rem] flex flex-col gap-2">
            <p className="text-Body text-[#696969]">닉네임</p>
            <label className="relative">
              <Refresh
                className="input_eye cursor-pointer"
                onClick={refreshHandler}
              />
              <input
                name="nickname"
                className="input"
                onChange={() => {
                  setValue('nickname', newNickname);
                }}
              />
            </label>
          </div>

          <button className="submit_btn bg-green-50">변경하기</button>
        </div>
      </form>
    </div>
  );
}

export default MyPageUpdate;
