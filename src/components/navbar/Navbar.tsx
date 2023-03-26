import React from 'react';
import { icons } from 'src/assets/navbar';
import { NavLink, useMatch } from 'react-router-dom';
import CommandNavBar from 'src/components/navbar/CommandNavbar';

function Navbar() {
  const postDetailPath = useMatch('/board/:postId');
  const navbarIcon = [
    { id: 'Home', link: '/', fill: icons.homeActive, empty: icons.home },
    { id: 'Knit', link: '/feed', fill: icons.knitActive, empty: icons.knit },
    {
      id: 'Board',
      link: '/board',
      fill: icons.boardActive,
      empty: icons.board,
    },
    {
      id: 'MyPage',
      link: '/my-page',
      fill: icons.myPageActive,
      empty: icons.myPage,
    },
  ];

  const navbarBtns = navbarIcon.map((icon) => {
    return (
      <NavLink key={icon.id} to={icon.link}>
        {({ isActive }) =>
          isActive ? (
            <div className="flex h-[2.875rem] w-[2.25rem] flex-col items-center gap-[0.35rem]">
              <img src={icon.fill} alt="" />
              <p className="text-[0.625rem] font-semibold text-green-50">
                {icon.id}
              </p>
            </div>
          ) : (
            <img src={icon.empty} alt="" />
          )
        }
      </NavLink>
    );
  });

  return (
    <div className="fixed left-0 bottom-0 flex h-[8.3rem] w-screen items-center justify-evenly rounded-[15px_15px_0px_0px] bg-white pb-[2rem] align-middle shadow-[0px_-1px_3px_rgba(0,0,0,0.15)]">
      {postDetailPath ? <CommandNavBar /> : navbarBtns}
    </div>
  );
}

export default Navbar;
