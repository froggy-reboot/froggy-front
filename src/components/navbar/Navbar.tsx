import React from 'react';
import { icons } from '@/assets/navbar';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const navbarIcons = [
    { id: 'Home', link: '/', fill: icons.Home_active, empty: icons.Home },
    { id: 'Knit', link: '/feed', fill: icons.Knit_active, empty: icons.Knit },
    {
      id: 'Board',
      link: '/board',
      fill: icons.Board_active,
      empty: icons.Board,
    },
    {
      id: 'MyPage',
      link: '/my-page',
      fill: icons.MyPage_active,
      empty: icons.MyPage,
    },
  ];

  return <div>Navbar</div>;
}

export default Navbar;
