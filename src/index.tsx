import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Nav from './components/Nav';
import Main from './pages/Main/Main';
import Map from './pages/Map/Map';
import Login from './pages/Login/Login';
import Mypage from 'pages/My/My';
import KaKaoToken from 'pages/Login/Kakao/token/token';
import RegisterUser from 'pages/My/RegisterUser/RegisterUser';
import RegisterSeller from 'pages/My/RegisterSeller/RegisterSeller';
import MyHome from 'pages/My/AfterLogin/MyHome';
import PostDetail from 'pages/My/PostDetail/PostDetail';
import LikePosts from 'pages/My/LikePosts/LikePosts';
import RecentPosts from 'pages/My/RecentPosts/RecentPosts';
import MyPosts from 'pages/My/MyPosts/MyPosts';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import NaverToken from 'pages/Login/Naver/token/token';
import GardenSelling from 'pages/My/GardenManage/gardenSelling/GardenSelling';
import GardenUsing from 'pages/My/GardenManage/gardenUsing/GardenUsing';
import GardenLike from 'pages/My/GardenManage/gardenLike/GardenLike';
import SalesHistory from 'pages/My/CropTrade/salesHistory/SalesHistory';
import PurchaseHistory from 'pages/My/CropTrade/purchaseHistory/PurchaseHistory';
import WishList from 'pages/My/CropTrade/wishList/WishList';
import WhisperPost from 'pages/My/Whisper/whisperPost/WhisperPost';
import CommentPost from 'pages/My/Whisper/commentPost/CommentPost';
import WhisperLike from 'pages/My/Whisper/Whisper';

// 모바일 100vh 세팅
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// React 코드...

const router = createBrowserRouter([
  {
    path: '/',
    element: <Nav />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/map',
        element: <Map />,
      },
      {
        path: '/my',
        element: <Mypage />,
        children: [
          {
            path: 'my_gardens/like',
            index: true,
            element: <LikePosts />,
          },
          {
            path: 'my_gardens/recent',
            element: <RecentPosts />,
          },
          {
            path: 'my_gardens/mypost',
            element: <MyPosts />,
          },
          {
            path: 'garden_manage/my_garden_selling',
            element: <GardenSelling />,
          },
          {
            path: 'garden_manage/my_garden_using',
            element: <GardenUsing />,
          },
          {
            path: 'garden_manage/like',
            element: <GardenLike />,
          },
          {
            path: 'crop_trade/sales_history',
            element: <SalesHistory />,
          },
          {
            path: 'crop_trade/purchase_history',
            element: <PurchaseHistory />,
          },
          {
            path: 'crop_trade/wishlist',
            element: <WishList />,
          },
          {
            path: 'whisper/my_post',
            element: <WhisperPost />,
          },
          {
            path: 'whisper/comment_post',
            element: <CommentPost />,
          },
          {
            path: 'whisper/like',
            element: <WhisperLike />,
          },
          {
            path: 'garden-register-user',
            element: <RegisterUser />,
          },
          {
            path: 'garden-register-seller',
            element: <RegisterSeller />,
          },
          {
            path: 'garden-register-user',
            element: <RegisterUser />,
          },
          {
            path: ':postId',
            element: <PostDetail />,
          },
          {
            path: 'garden/edit/:id',
            element: <RegisterUser />,
          },
          {
            path: 'post/edit/:id',
            element: <RegisterSeller />,
          },
        ],
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/my/oauth/kakao',
        element: <KaKaoToken />,
      },
      {
        path: '/my/oauth/naver',
        element: <NaverToken />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <HelmetProvider>
      <NavermapsProvider ncpClientId="jij6pc5oav">
        <GoogleOAuthProvider clientId="999513273898-9fa6iu0cm3jbeancg8f82mjs53trr355.apps.googleusercontent.com">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </NavermapsProvider>
    </HelmetProvider>
  </RecoilRoot>,
);
serviceWorkerRegistration.register();
// serviceWorker.register()
