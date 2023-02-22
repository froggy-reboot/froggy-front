import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from 'src/routes/RoutePage';
import Header from 'src/components/header/Header';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <RoutePage />
      </BrowserRouter>
      <ReactQueryDevtools />
      <SignIn />
      <SignUp />
    </>
  );
}

export default App;
