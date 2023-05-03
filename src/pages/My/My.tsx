import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeforeLogin from './BeforeLogin/BeforeLogin';
import AfterLogin from './AfterLogin/AfterLogin';

const Mypage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const nav = useNavigate();
  return <>{isLogin ? <AfterLogin /> : <BeforeLogin />}</>;
};

export default Mypage;
