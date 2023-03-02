import React from 'react';
import { SOCIAL_LOGIN } from 'src/pages/signin/SignInConstants';
import {
  getGoogleRegister,
  getKakaoRegister,
  getNaverRegister,
  getRavelryRegister,
} from 'src/apis/signInApi';

export default function SocialLogin() {
  const onClickHandler = (type: string) => {
    switch (type) {
      case 'ravelry':
        getRavelryRegister();
        break;
      case 'google':
        getGoogleRegister();
        break;
      case 'kakao':
        getKakaoRegister();
        break;
      case 'naver':
        getNaverRegister();
        break;
    }
  };

  return (
    <ul className="mt-[3rem] flex gap-[2rem] md:mt-[4rem] md:gap-[6rem]">
      {SOCIAL_LOGIN.map((social) => {
        return (
          <li
            key={social.id}
            className="h-[5rem] w-[5rem] rounded-full bg-black-10 md:h-[7rem] md:w-[7rem]"
            onClick={() => onClickHandler(social.type)}>
            <img src="" alt={social.type} />
          </li>
        );
      })}
    </ul>
  );
}
