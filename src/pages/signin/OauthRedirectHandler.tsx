import { postSocialLogin } from 'src/apis/signInApi';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from 'src/components/loader/Loader';
import { LOGIN } from 'src/pages/signin/SignInConstants';

export default function OauthRedirectHandler() {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(userId));

    (async function () {
      if (userId) {
        try {
          const response = await postSocialLogin(userId);
          if (response.status === 201) {
            localStorage.setItem('token', response.data.jwtToken);
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