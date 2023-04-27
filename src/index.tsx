import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { NavermapsProvider } from 'react-naver-maps';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Nav from './components/Nav';
import Main from './pages/Main/Main';
import Map from './pages/Map/Map';
import My from './pages/My/My';
import KaKaoUtil from 'pages/My/Kakao/KaKaoUtil';

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
        element: <My />,
      },
      {
        path: '/my/oauth/kakao',
        element: <KaKaoUtil />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <NavermapsProvider ncpClientId="jij6pc5oav">
      <GoogleOAuthProvider clientId="1048953217886-4pd4p4daua01k3h42o4mjejqnla288je.apps.googleusercontent.com">
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </NavermapsProvider>
  </React.StrictMode>,
);
