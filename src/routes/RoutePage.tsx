import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from 'src/pages/signin/SignIn';

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
    </Routes>
  );
}
