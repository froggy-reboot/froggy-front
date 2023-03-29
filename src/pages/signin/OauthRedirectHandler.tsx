import { postSocialLogin } from 'src/apis/signInApi';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { LOGIN } from 'src/pages/signin/SignInConstants';
import { useSetRecoilState } from 'recoil';
import { userInfoAtom } from 'src/atoms/atom';

export default function OauthRedirectHandler() {
  const setUserInfo = useSetRecoilState(userInfoAtom);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(userId));

    (async function () {
      if (userId) {
        try {
          const response = await postSocialLogin(Number(userId));
          if (response.status === 201) {
            localStorage.setItem('accessToken', response.data.jwtToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setUserInfo(response.data.user);
            navigate('/');
          }
        } catch (error) {
          alert(LOGIN.MESSAGE.ETC);
          navigate('/sign-in');
        }
      }
    })();
  }, [userId]);

  return <Loader />;
}
