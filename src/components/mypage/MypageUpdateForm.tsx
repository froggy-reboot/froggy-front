import { getUserInfo } from 'src/apis/authApi';
import { modals } from 'src/components/modals/Modals';
import React, { useEffect, useRef, useState } from 'react';

import { ReactComponent as Refresh } from 'src/assets/refresh.svg';
import { useModal } from 'src/hooks/useModal';
import { useQuery } from '@tanstack/react-query';

import { SubmitHandler, useForm } from 'react-hook-form';

import ProfileUpdateModal from 'src/components/modals/ProfileUpdateModal';
import { getRandomNickname } from 'src/apis/authApi';

interface IProfile {
  image: string;
  nickname: string;
}

function MypageUpdateForm() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const { openModal } = useModal();

  // 이미지 주소
  const [imgSrc, setImgSrc] = useState(data?.data.profileImg);

  // form 생성
  const { handleSubmit, setValue, register, reset } = useForm<IProfile>({
    mode: 'all',
    defaultValues: {
      image: '',
      nickname: '',
    },
  });

  // default Values 추가
  useEffect(() => {
    setImgSrc(data?.data.profileImg);
    reset({
      nickname: data?.data.nickname,
    });
  }, [reset, data]);
  // 사진 추가를 위한 Ref 생성
  const fileInput = useRef<HTMLInputElement>(null);

  // 닉네임 랜덤 refresh
  const refreshHandler = async () => {
    try {
      const response = await getRandomNickname();
      const randomNickname = response.data.nickname;
      setValue('nickname', randomNickname, { shouldDirty: true });
    } catch (error) {
      console.log(error);
    }
  };

  // 사진 preview 생성
  const setPreviewImg = (event: any) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      if (event.target) {
        setImgSrc(event.target.result);
      }
    };

    reader.readAsDataURL(event.target.files[0]);
  };
  const onSubmit: SubmitHandler<IProfile> = (data) => {
    const submitdata = {
      nickname: data.nickname,
      image: imgSrc,
    };
    console.log(submitdata);
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
            onChange={setPreviewImg}
          />
          <img
            src={imgSrc}
            alt="profile"
            className="mx-auto h-[11.875rem] w-[11.875rem] rounded-full bg-[#F5F5F5] object-cover"
            onClick={() => {
              if (fileInput != null) {
                openModal(modals.ProfileUpdateModal, { fileInput, setImgSrc });
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
              <input className="input" {...register('nickname')} />
            </label>
          </div>

          <button className="submit_btn bg-green-50">변경하기</button>
        </div>
      </form>
    </div>
  );
}

export default MypageUpdateForm;
