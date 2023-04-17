import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { getUserInfo } from 'src/apis/authApi';
function MypageProfileImage() {
  const userId = JSON.parse(localStorage.getItem('userId') || '{}');
  const { data } = useQuery(['user'], () => getUserInfo(userId));
  return (
    <div>
      <img
        src={data?.data.profileImg}
        alt="profile"
        className="h-[11.875rem] w-[11.875rem] rounded-full bg-[#F5F5F5] object-cover"
        />

    </div>
  )
}

export default MypageProfileImage