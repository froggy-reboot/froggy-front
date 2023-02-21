import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from 'src/routes/RoutePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <RoutePage />
      </BrowserRouter>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
