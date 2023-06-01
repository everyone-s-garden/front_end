import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface NoPostProps {
  title: string;
  subTitle: string;
  url: string;
}

function NoPost({ title, subTitle, url }: NoPostProps) {
  const nav = useNavigate();

  return (
    <NoPostsSection>
      {title}
      <Span>
        {subTitle}
        <span onClick={() => nav(url)}> 분양 텃밭들 보러가기</span>
      </Span>
    </NoPostsSection>
  );
}

export default NoPost;

const NoPostsSection = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #414c38;
  font-size: 16px;
  font-weight: 300;
`;

const Span = styled.span`
  margin-top: 14px;
  color: #afafaf;
  font-weight: 400;
  font-size: 13px;

  & > span {
    color: #afafaf;
    text-decoration: underline;
    cursor: pointer;
  }
`;
