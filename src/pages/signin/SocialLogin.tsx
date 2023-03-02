import React from 'react';
import { SOCIAL_LOGIN, LOGIN } from 'src/pages/signin/SignInConstants';
import {
  getGoogleRegister,
  getKakaoRegister,
  getNaverRegister,
  getRavelryRegister,
  postSocialLogin,
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
      if (response?.status === 201) {
        window.open(response.data);
        //글로벌에 있는 userId 갖고오기
        postSocialLogin(userId);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 301) {
          window.open(error.response.data);
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
            className="h-[5rem] w-[5rem] rounded-full bg-black-10 md:h-[7rem] md:w-[7rem]"
            onClick={() => onClickHandler(social.type)}>
            <img src="" alt={social.type} />
          </li>
        );
      })}
    </ul>
  );
}
