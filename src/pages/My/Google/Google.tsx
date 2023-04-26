import axios from 'axios';
import React from 'react';
import styled from 'styled-components';

const LoginGoogle = async () => {
  const response = await axios('');
  console.log(response);
};

const Google = () => {
  return <GoogleBtn onClick={LoginGoogle}>구글로 로그인하기</GoogleBtn>;
};

export default Google;

const GoogleBtn = styled.button`
  margin-top: 31px;
  width: 532px;
  height: 116px;
  background-color: #a8d178;
  border-radius: 30px;
  font-size: 28px;
  font-weight: 600;
`;
