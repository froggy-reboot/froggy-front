import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from 'src/pages/signin/SignIn';
import SignUp from 'src/pages/signup/SignUp';
import SocialLoginLoder from 'src/pages/signin/SocialLoginLoder';

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/:userId" element={<SocialLoginLoder />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}
