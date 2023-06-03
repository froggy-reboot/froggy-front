import React, { Fragment, useState } from 'react';
import { MENULIST } from 'src/pages/mypage/MypageConstants';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from 'src/pages/signin/SignInConstants';
import Loader from 'src/components/loader/Loader';
import { getLogout } from 'src/apis/mypageApi';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getUserInfo } from 'src/apis/authApi';

export default function MySetting() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { openModal } = useModal();
  const queryClient = useQueryClient();

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      const response = await getLogout();
      if (response.status === 200) {
        localStorage.clear();
        queryClient.clear();
        navigate('/sign-in');
      }
    } catch (error) {
      alert(LOGIN.MESSAGE.ETC);
    } finally {
      setIsLoading(false);
    }
  };

  const withdrawHandler = () => {
    if (data?.data.enrollType === 'local') {
      openModal(modals.WithdrawModal);
    } else {
      openModal(modals.WithdrawConfirmModal);
    }
  };

  const menuClickHandler = (menu: string) => {
    switch (menu) {
      case '로그아웃':
        logoutHandler();
        break;
      case '탈퇴하기':
        withdrawHandler();
        break;
      case '비밀번호 변경':
        navigate('/reset-password');
        break;
      case '알림설정':
        alert('기능을 준비 중 입니다.');
        break;
      case '이용약관':
        alert('기능을 준비 중 입니다.');
        break;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <ul className="flex w-full flex-col gap-[2px] p-[2.5rem]">
        {MENULIST.map((menu, idx) => (
          <Fragment key={idx}>
            <li
              onClick={() => menuClickHandler(menu)}
              className="cursor-pointer p-[14px] pl-[8px] text-Body font-medium">
              {menu}
            </li>
            {idx !== MENULIST.length - 1 && (
              <hr className="w-full border-black-30" />
            )}
          </Fragment>
        ))}
      </ul>
    </div>
  );
}
