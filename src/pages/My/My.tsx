import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeforeLogin from './BeforeLogin/BeforeLogin';
import AfterLogin from './AfterLogin/AfterLogin';
import axios from 'axios';

const Mypage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const nav = useNavigate();
  const getData = async () => {
    const res = await axios.get('http://garden.jinkyumpark.com');
    console.log(res);
  };
  getData();
  return <>{isLogin ? <AfterLogin /> : <BeforeLogin />}</>;
};

export default Mypage;
