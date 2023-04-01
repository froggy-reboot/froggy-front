import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from 'src/pages/signin/SignIn';
import BoardMain from 'src/pages/board/BoardMain';
import BoardCreate from 'src/pages/board/BoardCreate';
import BoardDetail from 'src/pages/board/BoardDetail';
import SignUp from 'src/pages/signup/SignUp';
import OauthRedirectHandler from 'src/pages/signin/OauthRedirectHandler';
import PrivateRoute from 'src/routes/PrivateRoute';
import MyPage from 'src/pages/mypage/MyPage';

export default function RoutePage() {
  return (
    <Routes>
      {/* 인증과 관계없는 페이지 */}
      <Route path="/board" element={<BoardMain />} />
      <Route path="/board/:postId" element={<BoardDetail />} />
      <Route path="/board/create" element={<BoardCreate />} />
      <Route
        path="/sign-in/social/:userId"
        element={<OauthRedirectHandler />}
      />
      <Route element={<PrivateRoute authentication={true} />}>
        {/* 비로그인이면 볼 수 없는 페이지 */}
        <Route path="/my-page" element={<MyPage />} />
      </Route>
      <Route element={<PrivateRoute authentication={false} />}>
        {/* 로그인이면 볼 수 없는 페이지 */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
