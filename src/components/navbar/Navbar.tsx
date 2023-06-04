import React from 'react';
import { NavLink, useMatch } from 'react-router-dom';
import CommandNavBar from 'src/components/board/CommandNavbar';
import { ReactComponent as Board } from 'src/assets/navbar/board.svg';
import { ReactComponent as MyPage } from 'src/assets/navbar/mypage.svg';
import { ReactComponent as BoardActive } from 'src/assets/navbar/boardActive.svg';
import { ReactComponent as MyPageActive } from 'src/assets/navbar/mypageActive.svg';
/* import { ReactComponent as Home } from 'src/assets/navbar/home.svg';
import { ReactComponent as HomeActive } from 'src/assets/navbar/homeActive.svg';
import { ReactComponent as KnitActive } from 'src/assets/navbar/knitActive.svg';
import { ReactComponent as Knit } from 'src/assets/navbar/knit.svg'; */

function Navbar() {
  const boardDetailPath = useMatch('/board/:postId');
  const boardEditPath = useMatch('/board/edit/:postId');
  const imagesDetailPath = useMatch('/board/images/:postId');
  const navbarIcon = [
    /*     { id: 'Home', link: '/', fill: <HomeActive />, empty: <Home /> },
    { id: 'Knit', link: '/feed', fill: <KnitActive />, empty: <Knit /> }, */
    {
      id: 'Board',
      link: '/',
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
      <div
        key={icon.id}
        className="flex h-[6.3rem] items-center justify-center gap-[0.35rem] px-[3rem]">
        <NavLink to={icon.link}>
          {({ isActive }) =>
            isActive ? (
              <div className="flex flex-col items-center">
                <div>{icon.fill}</div>
                <p className="text-Board font-semibold text-green-50">
                  {icon.id}
                </p>
              </div>
            ) : (
              icon.empty
            )
          }
        </NavLink>
      </div>
    );
  });

  const showNavbar = () => {
    let result = true;
    if (
      location.pathname === '/sign-in' ||
      location.pathname === '/sign-up' ||
      location.pathname === '/board/create' ||
      location.pathname === '/my-page/update' ||
      location.pathname === '/report' ||
      location.pathname === '/reset-passward' ||
      boardEditPath ||
      imagesDetailPath
    )
      result = false;
    return result;
  };

  return (
    <>
      {showNavbar() && (
        <div className="fixed left-0 bottom-0 min-h-[8.3rem] w-full rounded-[15px_15px_0px_0px] bg-white pb-[2rem] align-middle shadow-[0px_-1px_3px_rgba(0,0,0,0.15)]">
          <div className="mx-auto flex max-w-[76.8rem] justify-evenly">
            {boardDetailPath ? <CommandNavBar /> : navbarBtns}
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
