import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Loader from 'components/Loader';
const KaKaoUtil = () => {
  const [isLoading, setIsLoading] = useState(true);
  const nav = useNavigate();

  const getCode = async () => {
    const code = new URLSearchParams(window.location.search).get('code');
    console.log(code);
    // const response = axios.post('url_to_back_end', code);
    // nav('/');
  };
  useEffect(() => {
    getCode();
  }, []);
  return <Loader isLoading={isLoading} />;
};

export default KaKaoUtil;
