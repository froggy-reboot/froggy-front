import React, { useState } from 'react';
import { ReactComponent as DownBtn } from 'src/assets/down_btn.svg';
import { ReactComponent as AlarmIcon } from 'src/assets/alarm.svg';
import { ReactComponent as EditIcon } from 'src/assets/edit.svg';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from 'src/apis/authApi';
import { useModal } from 'src/hooks/useModal';
import RavelryConnectModal from 'src/components/modals/RavelryConnectModal';
import { Link } from 'react-router-dom';
import defaultProfile from 'src/assets/frog_image.png';
import { getMyUnreadNotification } from 'src/apis/mypageApi';

export default function MypagePopUp() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { openModal } = useModal();
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const [isExpand, setIsExpand] = useState(true);
  const { data: newAlarmCount } = useQuery(
    ['notification', 'new'],
    getMyUnreadNotification,
  );

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
          <div className="mx-auto flex w-[100%] max-w-[76.8rem] items-center gap-[1rem] md:px-[2rem]">
            <img
              src={data ? data.data.profileImg : defaultProfile}
              alt="profile"
              className="h-[5rem] w-[5rem] rounded-full bg-black-30 object-cover"
            />
            <Link
              to={'/my-page/update'}
              className="mr-auto flex items-center gap-[1rem] p-[1rem] text-Body font-bold">
              {data?.data.nickname}
              <EditIcon />
            </Link>
            <Link to={'/my-page/notification'} className="relative">
              <AlarmIcon
                className={`h-[3.2rem] w-[5.2rem] ${
                  newAlarmCount?.data && 'fill-green-50'
                }  pl-[1rem]`}
              />
              <div
                className={`${
                  newAlarmCount?.data ? 'visible' : 'invisible'
                } absolute right-[0.4rem] top-0 h-[0.8rem] w-[0.8rem] rounded-full bg-green-50`}
              />
            </Link>
          </div>
          {isExpand && (
            <div className="mx-auto mt-[1.5rem] flex w-[100%] max-w-[76.8rem] flex-col gap-[0.5rem] px-[1rem] text-[15px] font-medium md:p-[2rem]">
              <div className="flex justify-between py-[0.5rem]">
                <p>로그인 계정</p>
                <p className="font-normal text-black-50">
                  {data?.data.enrollType === 'local' ||
                  data?.data.enrollType === 'naver'
                    ? data?.data.email
                    : '소셜 로그인'}
                </p>
              </div>
              <hr className="w-[100%] text-black-10" />
              <div className="flex justify-between py-[0.5rem]">
                <p>레이블리 연동</p>
                <button
                  onClick={() =>
                    data?.data.isRavelryIntegrated === 'N' &&
                    openModal(RavelryConnectModal)
                  }
                  className={`mini_btn inline-block h-[2rem] w-[4rem] text-center text-Board leading-[1.9rem] ${
                    data?.data.isRavelryIntegrated === 'N' && 'bg-black-30'
                  }`}>
                  {data?.data.isRavelryIntegrated === 'N' ? '미완료' : '완료'}
                </button>
              </div>
              <hr className="w-[100%] text-black-10" />
              <div className="flex items-center justify-between py-[0.5rem]">
                <p>기타 설정</p>
                <Link to="/my-page/setting" className="p-2.5 pl-[1.5rem]">
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
