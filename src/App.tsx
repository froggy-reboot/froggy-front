import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from 'src/routes/RoutePage';
import Header from 'src/components/header/Header';
import Navbar from 'src/components/navbar/Navbar';

//모달 종류별로 렌더링하는 모달 컴포넌트 필요
import Modals from 'src/components/modals/Modals';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Modals />
        <RoutePage />
        <Navbar />
      </BrowserRouter>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
