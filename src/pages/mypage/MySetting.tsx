import React, { Fragment, useState } from 'react';
import { MENULIST } from 'src/pages/mypage/MypageConstants';
import { getLogout } from 'src/apis/authApi';
import { useNavigate } from 'react-router-dom';
import { LOGIN } from 'src/pages/signin/SignInConstants';
import Loader from 'src/components/loader/Loader';

export default function MySetting() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logoutHandler = async () => {
    try {
      setIsLoading(true);
      const response = await getLogout();
      if (response.status === 200) {
        localStorage.clear();
        navigate('/sign-in');
      }
    } catch (error) {
      alert(LOGIN.MESSAGE.ETC);
    } finally {
      setIsLoading(false);
    }
  };

  const menuClickHandler = (menu: string) => {
    switch (menu) {
      case '로그아웃':
        logoutHandler();
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="container">
      <ul className="flex w-full flex-col gap-[2px] p-[3.5rem]">
        {MENULIST.map((menu, idx) => (
          <Fragment key={idx}>
            <li
              onClick={() => menuClickHandler(menu)}
              className="cursor-pointer p-[10px] pl-[8px] text-[15px] font-medium">
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
