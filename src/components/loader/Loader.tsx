import React from 'react';
import spinner from 'src/assets/spinner.gif';

export default function Loader() {
  return (
    <div className="container absolute z-[2] flex justify-center bg-[rgba(255,255,255,0.4)] backdrop-blur-[6px]">
      <img src={spinner} alt="loading..." className="w-[20rem]" />
      <p className="absolute mt-[10rem] text-Callout">loading...</p>
    </div>
  );
}
