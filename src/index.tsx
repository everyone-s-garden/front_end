import './reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { NavermapsProvider } from 'react-naver-maps';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from 'Router';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <RecoilRoot>
    <NavermapsProvider ncpClientId={process.env.REACT_APP_NAVER_CLIENT_ID!}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
        <QueryClientProvider client={queryClient}>
          <Router />
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </NavermapsProvider>
  </RecoilRoot>,
);
