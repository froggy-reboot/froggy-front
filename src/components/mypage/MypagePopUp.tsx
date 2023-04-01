import React from 'react';
import { ReactComponent as DownBtn } from 'src/assets/down_btn.svg';
import { ReactComponent as AlarmIcon } from 'src/assets/alarm.svg';

export default function MypagePopUp() {
  const openPopUPHandler = () => {
    console.log('ㅎㅎ');
  };

  return (
    <div className="container">
      <div className="fixed inset-x-0 top-0">
        <div className="relative flex h-[8rem] items-center rounded-[0px_0px_10px_10px] bg-white px-[2.5rem] shadow-[0px_1px_3px_rgba(0,0,0,0.25)]">
          <div className="flex w-[100%] items-center gap-[15px]">
            <img
              src={''}
              alt="profile"
              className="h-[5rem] w-[5rem] rounded-full bg-green-10"
            />
            <p className="flex-1 text-Body font-bold">{'프로필닉네임'}</p>
            <AlarmIcon />
          </div>
        </div>
        <div className="absolute right-[2rem] bottom-[-1px] z-[10] h-[4px] w-[5.5rem] bg-white" />
        <button
          onClick={openPopUPHandler}
          className="absolute bottom-[-1.6rem] right-[2rem] flex h-[1.6rem] w-[5.5rem] items-start justify-center rounded-[0px_0px_15px_15px] bg-white shadow-[0px_1px_3px_rgba(0,0,0,0.25)]">
          <DownBtn />
        </button>
      </div>
    </div>
  );
}
