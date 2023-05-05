import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BeforeLogin from './BeforeLogin/BeforeLogin';
import AfterLogin from './AfterLogin/AfterLogin';
import axios from 'axios';
import { axiosInstance } from 'utils/token';

const Mypage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const nav = useNavigate();
  const getData = async () => {
    const res = await axiosInstance.get(`${process.env.REACT_APP_API_BASE_URL}`);
    console.log(res);
  };
  console.log(process.env.REACT_APP_API_BASE_URL);
  getData();
  return <>{isLogin ? <AfterLogin /> : <BeforeLogin />}</>;
};

export default Mypage;
