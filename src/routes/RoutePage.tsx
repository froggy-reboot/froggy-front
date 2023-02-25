import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from 'src/pages/signin/SignIn';
import BoardMain from 'src/pages/board/BoardMain';

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/board" element={<BoardMain />} />
    </Routes>
  );
}
