import React from 'react';
import { HEADER_TITLE } from 'src/components/header/HeaderData';
import { ReactComponent as BackIcon } from 'src/assets/back.svg';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { useModal } from 'src/hooks/useModal';
import { modals } from 'src/components/modals/Modals';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const boardEditPath = useMatch('/board/edit/:postId');
  const boardDetailPath = useMatch('/board/:postId');
  const { openModal } = useModal();

  const isMain = () => {
    let result = false;
    HEADER_TITLE.forEach((el) => {
      if (el.route === location.pathname && el.isMain) result = true;
    });
    return result;
  };

  const setPageTitle = () => {
    let pageTitle;
    HEADER_TITLE.forEach((el) => {
      if (el.route === location.pathname) pageTitle = el.title;
    });
    return pageTitle;
  };

  const showBackBtn = () => {
    let result = true;
    result = isMain() ? false : true;
    if (location.pathname === '/feed') {
      result = false;
    }
    return result;
  };

  const backBtnHandler = () => {
    if (location.pathname === '/board/create' || boardDetailPath) {
      navigate('/board');
    } else if (boardEditPath) {
      openModal(modals.StopEditModal, { isPostEdit: true });
    } else navigate(-1);
  };

  const showHeader = () => {
    let result = true;
    if (location.pathname === '/sign-in' || location.pathname === '/my-page')
      result = false;
    return result;
  };

  return (
    <>
      {showHeader() && (
        <header
          className={`fixed top-0 right-0 z-[1] flex h-[6rem] w-[100%] items-center bg-white shadow-[0_1px_3px_rgba(0,0,0,0.20)] ${
            isMain() ? 'justify-center' : null
          }`}>
          {showBackBtn() ? (
            <BackIcon
              className="m-4 h-[2.4rem] w-[2.4rem]"
              onClick={backBtnHandler}
            />
          ) : null}
          <h1 className="ml-[0.8rem] text-Navbar">{setPageTitle()}</h1>
        </header>
      )}
    </>
  );
}
