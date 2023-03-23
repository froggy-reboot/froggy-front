import React from 'react';
import { SOCIAL_LOGIN, LOGIN } from 'src/pages/signin/SignInConstants';
import {
  getGoogleRegister,
  getKakaoRegister,
  getNaverRegister,
  getRavelryRegister,
} from 'src/apis/signInApi';
import axios from 'axios';

export default function SocialLogin() {
  const onClickHandler = async (type: string) => {
    try {
      let response;
      switch (type) {
        case 'ravelry':
          response = await getRavelryRegister();
          break;
        case 'google':
          response = await getGoogleRegister();
          break;
        case 'kakao':
          response = await getKakaoRegister();
          break;
        case 'naver':
          response = await getNaverRegister();
          break;
      }
      if (response?.status === (201 || 200)) {
        window.location.replace(response.data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 301) {
          window.location.replace(error.response.data);
        } else {
          alert(LOGIN.MESSAGE.ETC);
        }
      }
    }
  };

  return (
    <ul className="mt-[3rem] flex gap-[2rem] md:mt-[4rem] md:gap-[6rem]">
      {SOCIAL_LOGIN.map((social) => {
        return (
          <li
            key={social.id}
            className="h-[5rem] w-[5rem] rounded-full bg-black-10 drop-shadow-[0px_1px_3px_rgba(0,0,0,0.2)] md:h-[7rem] md:w-[7rem]"
            onClick={() => onClickHandler(social.type)}>
            <img src={social.icon} alt={social.type} />
          </li>
        );
      })}
    </ul>
  );
}
