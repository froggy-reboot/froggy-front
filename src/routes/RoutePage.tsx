import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from 'src/pages/main/Main';
import SignIn from 'src/pages/signin/SignIn';
import SignUp from 'src/pages/signup/SignUp';
import OauthRedirectHandler from 'src/pages/signin/OauthRedirectHandler';
import PrivateRoute from 'src/routes/PrivateRoute';

export default function RoutePage() {
  return (
    <Routes>
      {/* 인증과 관계없는 페이지 */}
      <Route
        path="/sign-in/social/:userId"
        element={<OauthRedirectHandler />}
      />
      <Route element={<PrivateRoute authentication={true} />}>
        {/* 비로그인이면 볼 수 없는 페이지 */}
      </Route>
      <Route element={<PrivateRoute authentication={false} />}>
        {/* 로그인이면 볼 수 없는 페이지 */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
