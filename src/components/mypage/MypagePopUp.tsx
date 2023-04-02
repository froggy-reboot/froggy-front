import React, { useState } from 'react';
import { ReactComponent as DownBtn } from 'src/assets/down_btn.svg';
import { ReactComponent as AlarmIcon } from 'src/assets/alarm.svg';
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from 'src/apis/authApi';

export default function MypagePopUp() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const [isExpand, setIsExpand] = useState([false, false]);

  const openPopUPHandler = (index: number) => {
    isExpand[index] = !isExpand[index];
    setIsExpand([...isExpand]);
  };

  return (
    <div className="container">
      <div className="fixed inset-x-0 top-0">
        <div
          className={`relative flex flex-col ${
            isExpand[0] ? 'h-auto' : 'h-[8rem]'
          } items-start rounded-[0px_0px_10px_10px] bg-white px-[3rem] py-[1.5rem] shadow-[0px_1px_3px_rgba(0,0,0,0.25)]`}>
          <div className="flex w-[100%] items-center gap-[15px]">
            <img
              src={data?.data.profileImg}
              alt="profile"
              className="h-[5rem] w-[5rem] rounded-full bg-green-10 object-cover"
            />
            <p className="flex-1 text-Body font-bold">{data?.data.nickname}</p>
            <AlarmIcon />
          </div>
          {isExpand[0] && (
            <div className="mt-[1.5rem] flex w-[100%] flex-col gap-[1rem] px-[1rem] text-Tag font-normal">
              <div className="flex justify-between">
                <p>로그인 계정</p>
                <p className="text-black-50">{data?.data.email}</p>
              </div>
              <hr className="w-[100%] text-black-10" />
              <div className="flex justify-between">
                <p>레이블리 연동</p>
                <p
                  className={`mini_btn inline-block h-[1.9rem] w-[3.8rem] text-center text-Board leading-[1.9rem] ${
                    data?.data.isRavelryIntegrated === 'N' && 'bg-black-30'
                  }`}>
                  {data?.data.isRavelryIntegrated === 'N' ? '미완료' : '완료'}
                </p>
              </div>
              <hr className="w-[100%] text-black-10" />
              <div className="flex items-center justify-between">
                <p>기타 설정</p>
                <DownBtn stroke="#949494" className="w-[12px] -rotate-90" />
              </div>
              {isExpand[1] && <hr className="w-[100%] text-black-10" />}
              <div
                className={`flex items-center justify-between font-bold ${
                  isExpand[1]
                    ? 'h-auto'
                    : 'mt-[1rem] h-[3.5rem] rounded-[10px] bg-black-10 px-[1rem] pr-[15px] leading-[3.5rem]'
                }`}>
                게시판 활동
                <DownBtn
                  stroke="black"
                  onClick={() => openPopUPHandler(1)}
                  className={`w-[12px] ${isExpand[1] && 'rotate-180'}`}
                />
              </div>
              {isExpand[1] && (
                <div className="flex flex-col gap-[1rem] pl-[1rem]">
                  <p>내가 쓴 글</p>
                  <p>내가 쓴 댓글</p>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="absolute right-[2rem] bottom-0 z-[10] h-[4px] w-[5.5rem] bg-white" />
        <button
          onClick={() => openPopUPHandler(0)}
          className="absolute bottom-[-1.6rem] right-[2rem] flex h-[1.6rem] w-[5.5rem] items-start justify-center rounded-[0px_0px_15px_15px] bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.25)]">
          <DownBtn
            stroke="#949494"
            className={`${isExpand[0] && 'rotate-180'}`}
          />
        </button>
      </div>
    </div>
  );
}
