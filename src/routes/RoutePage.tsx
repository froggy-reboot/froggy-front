import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from 'src/pages/signin/SignIn';
import SignUp from 'src/pages/signup/SignUp';
import OauthRedirectHandler from 'src/pages/signin/OauthRedirectHandler';

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/:userId" element={<OauthRedirectHandler />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}
