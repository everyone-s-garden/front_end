import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import Nav from './components/Nav/Nav';
import Main from './pages/Main/Main';
import Map from './pages/Map/Map';
import Login from './pages/Login/Login';
import Mypage from 'pages/My/My';
import KaKaoToken from 'pages/Login/Kakao/token/token';
import RegisterUser from 'pages/My/RegisterUser/RegisterUser';
import RegisterSeller from 'pages/My/RegisterSeller/RegisterSeller';
import PostDetail from 'pages/My/PostDetail/PostDetail';
import LikePosts from 'pages/My/LikePosts/LikePosts';
import RecentPosts from 'pages/My/RecentPosts/RecentPosts';
import MyPosts from 'pages/My/MyPosts/MyPosts';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import Chat from 'pages/Chat/Chat';
import Review from 'pages/Review/Review';
import ReceiveReview from 'pages/ReceiveReview/ReceiveReview';
import Header from 'components/Header/Header';
import NaverToken from 'pages/Login/Naver/token/token';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import ChatContent from 'pages/Chat/ChatContent/ChatContent';
import StartContent from 'pages/Chat/ChatContent/StartContent';

import GardenSelling from 'pages/My/GardenManage/gardenSelling/GardenSelling';
import GardenUsing from 'pages/My/GardenManage/gardenUsing/GardenUsing';
import GardenLike from 'pages/My/GardenManage/gardenLike/GardenLike';
import SalesHistory from 'pages/My/CropTrade/salesHistory/SalesHistory';
import PurchaseHistory from 'pages/My/CropTrade/purchaseHistory/PurchaseHistory';
import WishList from 'pages/My/CropTrade/wishList/WishList';
import WhisperPost from 'pages/My/Whisper/whisperPost/WhisperPost';
import CommentPost from 'pages/My/Whisper/commentPost/CommentPost';
import WhisperLike from 'pages/My/Whisper/Whisper';
import Index from 'pages/My/Index';
import RegiontalCertificate from 'pages/My/RegionalCertificatite/RegiontalCertificate';
import Setting from 'pages/Setting/Setting';
import Announcement from 'pages/Setting/Announcement/Announcement';
import Faq from 'pages/Setting/Faq/Faq';
import DeleteAccount from 'pages/Setting/DeleteAccount';
import AnnouncementList from 'pages/Setting/Announcement/AnnouncementList';
import AnnouncementDetail from 'pages/Setting/Announcement/AnnouncementDetail';
import FaqList from 'pages/Setting/Faq/FaqList';
import FaqDetail from 'pages/Setting/Faq/FaqDetail';
import EditUserProfile from 'pages/Setting/EditUserProfile';
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
            element: <Index />,
          },
          {
            path: 'my_gardens/like',
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
            path: 'crop_trade/regional_certification',
            element: <RegiontalCertificate />,
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
        path: 'setting',
        element: <Setting />,
      },
      {
        path: '/announcement',
        element: <Announcement />,
        children: [
          {
            index: true,
            element: <AnnouncementList />,
          },
          {
            path: 'detail/:id',
            element: <AnnouncementDetail />,
          },
        ],
      },
      {
        path: '/faq',
        element: <Faq />,
        children: [
          {
            index: true,
            element: <FaqList />,
          },
          {
            path: 'detail',
            element: <FaqDetail />,
          },
        ],
      },
      {
        path: '/edit_profile',
        element: <EditUserProfile />,
      },
      {
        path: '/delete_account',
        element: <DeleteAccount />,
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
      {
        path: '/chat',
        element: <Chat />,
        children: [
          {
            index: true,
            element: <StartContent />,
          },
          {
            path: ':chatId',
            element: <ChatContent />,
          },
        ],
      },
      {
        path: '/review',
        element: <Review />,
      },
      {
        path: '/receive-review',
        element: <ReceiveReview />,
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
            <ThemeProvider theme={theme}>
              <RouterProvider router={router} />
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </GoogleOAuthProvider>
      </NavermapsProvider>
    </HelmetProvider>
  </RecoilRoot>,
);
serviceWorkerRegistration.register();
// serviceWorker.register()
