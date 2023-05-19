import React, { useState } from 'react';
import { ReactComponent as DownBtn } from 'src/assets/down_btn.svg';
import { ReactComponent as AlarmIcon } from 'src/assets/alarm.svg';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from 'src/apis/authApi';
import { useModal } from 'src/hooks/useModal';
import RavelryConnectModal from 'src/components/modals/RavelryConnectModal';
import { Link } from 'react-router-dom';
import defaultProfile from 'src/assets/frog_image.png';

export default function MypagePopUp() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const { openModal } = useModal();
  const [isExpand, setIsExpand] = useState(true);

  const openPopUPHandler = () => {
    setIsExpand(!isExpand);
  };

  return (
    <div>
      <div className="fixed inset-x-0 top-0">
        <div
          className={`relative flex flex-col ${
            isExpand ? 'h-auto' : 'h-[8rem]'
          } items-start rounded-[0px_0px_10px_10px] bg-white px-[3rem] py-[1.5rem] shadow-[0px_1px_3px_rgba(0,0,0,0.25)]`}>
          <div className="flex w-[100%] items-center gap-[15px]">
            <img
              src={data ? data.data.profileImg : defaultProfile}
              alt="profile"
              className="h-[5rem] w-[5rem] rounded-full bg-black-30 object-cover"
            />
            <p className="flex-1 font-bold text-Body">{data?.data.nickname}</p>
            <AlarmIcon />
          </div>
          {isExpand && (
            <div className="mt-[1.5rem] flex w-[100%] flex-col gap-[0.5rem] px-[1rem] text-[15px] font-medium">
              <div className="flex justify-between py-[0.5rem]">
                <p>로그인 계정</p>
                <p className="font-normal text-black-50">{data?.data.email}</p>
              </div>
              <hr className="w-[100%] text-black-10" />
              <div className="flex justify-between py-[0.5rem]">
                <p>레이블리 연동</p>
                <p
                  onClick={() =>
                    data?.data.isRavelryIntegrated === 'N' &&
                    openModal(RavelryConnectModal)
                  }
                  className={`mini_btn inline-block h-[1.9rem] w-[3.8rem] text-center text-Board leading-[1.9rem] ${
                    data?.data.isRavelryIntegrated === 'N' && 'bg-black-30'
                  }`}>
                  {data?.data.isRavelryIntegrated === 'N' ? '미완료' : '완료'}
                </p>
              </div>
              <hr className="w-[100%] text-black-10" />
              <div className="flex items-center justify-between py-[0.5rem]">
                <p>기타 설정</p>
                <Link to="/my-page/setting" className="p-2.5">
                  <DownBtn stroke="#949494" className="w-[12px] -rotate-90" />
                </Link>
              </div>
              <hr className="w-[100%] text-black-10" />
              <div className="flex h-auto items-center justify-between py-[0.5rem]">
                게시판 활동
              </div>
              {isExpand && (
                <div className="flex flex-col gap-[0.5rem] pl-[1rem] font-normal">
                  <Link to={'/my-page/articles'} className="py-[0.25rem]">
                    내가 쓴 글
                  </Link>
                  <Link to={'/my-page/comments'} className="py-[0.25rem]">
                    내가 쓴 댓글
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute right-[2rem] bottom-0 z-[10] h-[4px] w-[5.5rem] bg-white" />
        <button
          onClick={() => openPopUPHandler()}
          className="absolute bottom-[-1.6rem] right-[2rem] flex h-[1.6rem] w-[5.5rem] items-start justify-center rounded-[0px_0px_15px_15px] bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.25)]">
          <DownBtn stroke="#949494" className={`${isExpand && 'rotate-180'}`} />
        </button>
      </div>
    </div>
  );
}
