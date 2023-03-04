import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from 'src/pages/signin/SignIn';
import BoardMain from 'src/pages/board/BoardMain';
import BoardCreate from 'src/pages/board/BoardCreate';

export default function RoutePage() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/board" element={<BoardMain />} />
      <Route path="/board/create" element={<BoardCreate />} />
    </Routes>
  );
}
