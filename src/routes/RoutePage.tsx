import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from 'src/pages/main/Main';
import SignIn from 'src/pages/signin/SignIn';
import SignUp from 'src/pages/signup/SignUp';

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  );
}
