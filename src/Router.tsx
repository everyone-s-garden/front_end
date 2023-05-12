import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Nav from './components/Nav';
import Main from './pages/Main/Main';
import Map from './pages/Map/Map';
import Login from './pages/Login/Login';
import Mypage from 'pages/My/My';
import Token from 'pages/Login/Kakao/token/token';
import RegisterUser from 'pages/register_user/RegisterUser';
import RegisterSeller from 'pages/register_seller/RegisterSeller';

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
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/my/oauth/kakao',
        element: <Token />,
      },
      {
        path: '/garden-register-user',
        element: <RegisterUser />,
      },
      {
        path: '/garden-register-seller',
        element: <RegisterSeller />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
