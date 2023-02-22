import React from 'react';
import spinner from 'src/assets/spinner.gif';
import ellipse from 'src/assets/ellipse.svg';
import { ReactComponent as Logo } from 'src/assets/logo_yellow.svg';

export default function Splash() {
  return (
    <div className="container bg-green-50">
      <img src={spinner} alt="loading..." className="z-[1] mt-[14rem]" />
      <img src={ellipse} alt="loading..." className="absolute top-[35.6rem]" />
      <Logo className="absolute bottom-[35.6rem] w-[18.8rem]" />
    </div>
  );
}
