import React from 'react';
import spinner from 'src/assets/spinner.gif';

export default function Loader() {
  return (
    <div className="absolute inset-x-0 top-0 z-[2] flex h-[100%] w-[100%] items-center justify-center bg-[rgba(255,255,255,0.4)] backdrop-blur-[6px]">
      <img src={spinner} alt="loading..." className="h-[20rem] w-[20rem]" />
      <p className="absolute mt-[10rem] text-Callout">loading...</p>
    </div>
  );
}
