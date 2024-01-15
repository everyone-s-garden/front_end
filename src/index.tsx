import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Nav from './components/Nav/Nav';
import Main from './pages/Main/Main';
import Map from './pages/Map/Map';
import Login from './pages/Login/Login';
import Mypage from 'pages/My/My';
import Token from 'pages/Login/Kakao/token/token';
import RegisterUser from 'pages/My/RegisterUser/RegisterUser';
import RegisterSeller from 'pages/My/RegisterSeller/RegisterSeller';
import MyHome from 'pages/My/AfterLogin/MyHome';
import PostDetail from 'pages/My/PostDetail/PostDetail';
import LikePosts from 'pages/My/LikePosts/LikePosts';
import RecentPosts from 'pages/My/RecentPosts/RecentPosts';
import MyPosts from 'pages/My/MyPosts/MyPosts';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Header from 'components/Header/Header';

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
    element: <Header />,
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
            index: true,
            element: <MyHome />,
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
            path: 'garden-register-seller',
            element: <RegisterSeller />,
          },
          {
            path: 'like',
            element: <LikePosts />,
          },
          {
            path: 'recent',
            element: <RecentPosts />,
          },
          {
            path: 'mypost',
            element: <MyPosts />,
          },
          {
            path: ':postId',
            element: <PostDetail />,
          },
          {
            path: 'garden/edit',
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
        element: <Token />,
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
