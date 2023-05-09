import React, { useEffect } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from 'src/routes/RoutePage';
import Header from 'src/components/header/Header';
import Navbar from 'src/components/navbar/Navbar';
import Modals from 'src/components/modals/Modals';
import setMobileHeight from 'src/utils/setMobileHeight/setMobileHeight';

function App() {
  useEffect(() => {
    setMobileHeight();
    window.addEventListener('resize', setMobileHeight);
    return () => window.removeEventListener('resize', setMobileHeight);
  }, []);

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
