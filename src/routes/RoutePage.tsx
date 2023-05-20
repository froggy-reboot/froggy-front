import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from 'src/pages/signin/SignIn';
import BoardMain from 'src/pages/board/BoardMain';
import BoardCreate from 'src/pages/board/BoardCreate';
import BoardDetail from 'src/pages/board/BoardDetail';
import SignUp from 'src/pages/signup/SignUp';
import OauthRedirectHandler from 'src/pages/signin/OauthRedirectHandler';
import PrivateRoute from 'src/routes/PrivateRoute';
import MyPage from 'src/pages/mypage/MyPage';
import ReportPage from 'src/pages/report/ReportPage';
import RavelryConnectHandler from 'src/pages/signin/RavelryConnectHandler';
import MySetting from 'src/pages/mypage/MySetting';
import ImagesDetail from 'src/components/images/ImagesDetail';
import MyPostLog from 'src/pages/mypage/MyPostLog';
import MyCommentLog from 'src/pages/mypage/MyCommentLog';
import MypageUpdate from 'src/components/mypage/MypageUpdateForm';

export default function RoutePage() {
  return (
    <Routes>
      {/* 인증과 관계없는 페이지 */}
      <Route path="/" element={<BoardMain />} />
      <Route path="/board" element={<BoardMain />} />
      <Route path="/board/:postId" element={<BoardDetail />} />
      <Route path="/board/create" element={<BoardCreate />} />
      <Route
        path="/sign-in/social/:userId"
        element={<OauthRedirectHandler />}
      />
      <Route
        path="/sign-in/ravelry/:ravelryUserId"
        element={<RavelryConnectHandler />}
      />
      <Route path="/board/create" element={<BoardCreate />} />
      <Route path="/board/edit/:postId" element={<BoardCreate />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/board/images/:postId" element={<ImagesDetail />} />
      <Route element={<PrivateRoute authentication={true} />}>
        {/* 비로그인이면 볼 수 없는 페이지 */}
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/my-page/setting" element={<MySetting />} />
        <Route path="/my-page/update" element={<MypageUpdate />} />
        <Route path="/my-page/articles" element={<MyPostLog />} />
        <Route path="/my-page/comments" element={<MyCommentLog />} />
      </Route>
      <Route element={<PrivateRoute authentication={false} />}>
        {/* 로그인이면 볼 수 없는 페이지 */}
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Route>
    </Routes>
  );
}
