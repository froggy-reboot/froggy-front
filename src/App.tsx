import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import SignIn from './pages/signin/SignIn';
import SignUp from './pages/signup/SignUp';

function App() {
  return (
    <>
      <div className="flex h-[100vh] items-center justify-center text-Body text-green-100">
        hello froggy
      </div>
      <ReactQueryDevtools />
      <SignIn />
      <SignUp />
    </>
  );
}

export default App;
