import React, { useEffect, useRef, useState } from 'react';
import { getUserInfo } from 'src/apis/authApi';
import { modals } from 'src/components/modals/Modals';
import { ReactComponent as Refresh } from 'src/assets/refresh.svg';
import { useModal } from 'src/hooks/useModal';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { getRandomNickname, patchUserProfile } from 'src/apis/mypageApi';
import { useNavigate } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { useRecoilValue } from 'recoil';
import { isProfileAtom } from 'src/atoms/atom';
import { useDidUpdateEffect } from 'src/hooks/useDidUpdateEffect';

interface IProfile {
  image: string;
  nickname: string;
}

function MypageUpdate() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const { openModal } = useModal();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const isProfile = useRecoilValue(isProfileAtom);

  // 이미지 주소
  const [imagePreview, setImagePreview] = useState(data?.data.profileImg);
  const [imageFile, setImageFile] = useState(data?.data.profileImg);

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
    setImagePreview(data?.data.profileImg);
    reset({
      nickname: data?.data.nickname,
    });
  }, [reset, data]);
  // 사진 추가를 위한 Ref 생성
  const fileInput = useRef<HTMLInputElement>(null);

  // 모달에서 프로필 이미지 선택 클릭 시
  useDidUpdateEffect(() => {
    if (isProfile.isCustom) {
      fileInput.current?.click();
    }
  }, [isProfile]);

  // 닉네임 랜덤 refresh
  const refreshHandler = async () => {
    try {
      setIsLoading(true);
      const response = await getRandomNickname();
      const randomNickname = response.data.nickname;
      setValue('nickname', randomNickname, { shouldDirty: true });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // eslint-disable-next-line
  const imageHandler = (event: any) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      if (event.target) {
        setImagePreview(event.target.result);
      }
    };
    setImageFile(event.target.files[0]);
    reader.readAsDataURL(event.target.files[0]);
  };

  const onSubmit: SubmitHandler<IProfile> = async (data) => {
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('nickname', data.nickname);
    formData.append('defaultImage', isProfile.isDefault ? 'Y' : 'N');
    try {
      setIsLoading(true);
      const response = await patchUserProfile({
        formData: formData,
        userId: userId,
      });
      if (response.status === 200) {
        alert('프로필이 변경되었습니다.');
        queryClient.invalidateQueries({ queryKey: ['user'] }),
          navigate('/my-page');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container h-real-screen pb-4">
      <form
        className="mt-[6rem] flex h-full w-[100%] flex-col justify-between px-[3rem] md:mt-[10rem]"
        onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-[0.5rem] md:gap-[1.5rem]">
          {/* 프로필 이미지 영역 */}
          <input
            accept="image/*"
            className="hidden"
            id="image"
            type="file"
            ref={fileInput}
            name="image"
            onChange={imageHandler}
          />
          <img
            src={imagePreview}
            alt="profile"
            className="mx-auto h-[17rem] w-[17rem] cursor-pointer rounded-full bg-black-10 object-cover"
            onClick={() => {
              if (fileInput != null) {
                openModal(modals.ProfileUpdateModal, {
                  setImagePreview,
                });
              }
            }}
          />
          {/* 프로필 닉네임 영역 */}
          <div className="mt-[2.5rem] flex flex-col gap-2">
            <p className="ml-[0.4rem] text-Body text-[#696969]">닉네임</p>
            <label className="relative">
              <Refresh
                className="input_eye right-[0.6rem] h-[4.4rem] w-[4.4rem] cursor-pointer p-[1rem]"
                onClick={refreshHandler}
              />
              <input className="input pr-0" {...register('nickname')} />
            </label>
          </div>
        </div>
        <button className="submit_btn mb-[2rem] bg-green-50">변경하기</button>
      </form>
    </div>
  );
}

export default MypageUpdate;
