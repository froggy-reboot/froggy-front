import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from 'src/routes/RoutePage';
import Header from 'src/components/header/Header';
import Navbar from 'src/components/navbar/Navbar';
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
