import Loader from 'src/components/loader/Loader';
import React from 'react';
import { useParams } from 'react-router-dom';

export default function SocialLoginLoder() {
  const { userId } = useParams();
  //userId atom저장
  return <Loader />;
}
