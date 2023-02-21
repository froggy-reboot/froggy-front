import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from 'src/routes/RoutePage';
import Header from './components/header/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RoutePage />
      </BrowserRouter>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
