import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeforeLogin from './BeforeLogin/BeforeLogin';
import AfterLogin from './AfterLogin/AfterLogin';
import axios from 'axios';
import { axiosInstance } from 'utils/token';
import { getItem } from 'utils/session';
import { isLoginAtom } from 'utils/atom';
import { useRecoilValue } from 'recoil';
const Mypage = () => {
  const nav = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  useEffect(() => {}, [isLogin]);
  return <>{isLogin ? <AfterLogin /> : <BeforeLogin />}</>;
};

export default Mypage;
