import React from 'react';
import { HEADER_TITLE } from 'src/components/header/HeaderData';
import { ReactComponent as BackIcon } from 'src/assets/back.svg';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const setPageTitle = () => {
    let pageTitle;
    HEADER_TITLE.map((el) => {
      if (el.route === location.pathname) pageTitle = el.title;
    });
    return pageTitle;
  };

  const showBackBtn = () => {
    let result = true;
    HEADER_TITLE.map((el) => {
      if (el.route === location.pathname && el.isMain) result = false;
    });
    if (location.pathname === '/sign-in') result = false;

    return result;
  };

  return (
    <header className="fixed flex h-[6rem] w-[100%] items-center">
      {showBackBtn() ? (
        <BackIcon className="m-4 h-[2.4rem] w-[2.4rem]" />
      ) : null}
      <h1 className="ml-[0.8rem] text-Navbar">{setPageTitle()}</h1>
    </header>
  );
}
