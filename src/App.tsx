import React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <>
      <div className="flex h-[100vh] items-center justify-center text-5xl font-bold text-green-500">
        hello froggy
      </div>
      <ReactQueryDevtools />
    </>
  );
}

export default App;
