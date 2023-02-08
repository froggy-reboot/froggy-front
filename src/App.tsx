import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <div className="flex h-[100vh] items-center justify-center text-green-100 text-Body">
        hello froggy
      </div>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
