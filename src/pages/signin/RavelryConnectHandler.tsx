import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { postRavelryConnect } from 'src/apis/signInApi';
import Loader from 'src/components/loader/Loader';
import { LOGIN } from 'src/pages/signin/SignInConstants';

export default function RavelryConnectHandler() {
  const { ravelryUserId } = useParams() as { ravelryUserId: string };
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    localStorage.setItem('ravelryUserId', ravelryUserId);

    (async function () {
      if (ravelryUserId) {
        try {
          const response = await postRavelryConnect(Number(ravelryUserId));
          if (response.status === 200) {
            navigate('/mypage');
            alert('연동이 완료되었습니다.');
          }
        } catch (error) {
          alert(LOGIN.MESSAGE.ETC);
          navigate('/mypage');
        } finally {
          queryClient.invalidateQueries({ queryKey: ['user'] });
        }
      }
    })();
  }, [ravelryUserId]);

  return <Loader />;
}
