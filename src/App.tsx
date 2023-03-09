import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from 'src/routes/RoutePage';
import Header from 'src/components/header/Header';

//모달 종류별로 렌더링하는 모달 컴포넌트 필요
import UpdateDeleteModal from './components/modals/UpdateDeleteModal';
import { useModal } from 'src/hooks/useModal';

function App() {
  const { showModal } = useModal();
  return (
    <>
      <BrowserRouter>
        <Header />
        {showModal && <UpdateDeleteModal />}
        <RoutePage />
      </BrowserRouter>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
