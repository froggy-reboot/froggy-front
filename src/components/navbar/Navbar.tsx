import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import CommandNavBar from 'src/components/board/CommandNavbar';
import { ReactComponent as Board } from 'src/assets/navbar/board.svg';
import { ReactComponent as Home } from 'src/assets/navbar/home.svg';
import { ReactComponent as Knit } from 'src/assets/navbar/knit.svg';
import { ReactComponent as MyPage } from 'src/assets/navbar/mypage.svg';
import { ReactComponent as BoardActive } from 'src/assets/navbar/boardActive.svg';
import { ReactComponent as HomeActive } from 'src/assets/navbar/homeActive.svg';
import { ReactComponent as KnitActive } from 'src/assets/navbar/knitActive.svg';
import { ReactComponent as MyPageActive } from 'src/assets/navbar/mypageActive.svg';

function Navbar() {
  const boardDetailPath = useMatch('/board/:postId');
  const boardEditPath = useMatch('/board/edit/:postId');
  const navbarIcon = [
    { id: 'Home', link: '/', fill: <HomeActive />, empty: <Home /> },
    { id: 'Knit', link: '/feed', fill: <KnitActive />, empty: <Knit /> },
    {
      id: 'Board',
      link: '/board',
      fill: <BoardActive />,
      empty: <Board />,
    },
    {
      id: 'MyPage',
      link: '/my-page',
      fill: <MyPageActive />,
      empty: <MyPage />,
    },
  ];

  const navbarBtns = navbarIcon.map((icon) => {
    return (
      <NavLink key={icon.id} to={icon.link}>
        {({ isActive }) =>
          isActive ? (
            <div className="flex h-[2.8rem] w-[2.8rem] flex-col items-center gap-[0.35rem]">
              <div>{icon.fill}</div>
              <p className="text-[0.625rem] font-semibold text-green-50">
                {icon.id}
              </p>
            </div>
          ) : (
            icon.empty
          )
        }
      </NavLink>
    );
  });

  const showNavbar = () => {
    let result = true;
    if (
      location.pathname === '/sign-in' ||
      location.pathname === '/sign-up' ||
      location.pathname === '/board/create' ||
      boardEditPath
    )
      result = false;
    return result;
  };

  return (
    <>
      {showNavbar() && (
        <div className="fixed left-0 bottom-0 flex h-auto min-h-[8.3rem] w-screen items-center justify-evenly rounded-[15px_15px_0px_0px] bg-white pb-[2rem] align-middle shadow-[0px_-1px_3px_rgba(0,0,0,0.15)]">
          {boardDetailPath ? <CommandNavBar /> : navbarBtns}
        </div>
      )}
    </>
  );
}

export default Navbar;
