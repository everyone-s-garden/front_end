import React from 'react';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';

const Content = ({ text }: { text: string }) => {
  const html = sanitizeHtml(text, {
    allowedAttributes: {
      div: ['class'],
    },
  });

  const handleReport = () => {
    // TODO: 신고하기 기능 구현
  };

  return (
    <Container>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Report>
        <button onClick={handleReport}>글 신고하기</button>
      </Report>
    </Container>
  );
};

export default Content;

const Container = styled.section`
  max-width: 1194px;
  width: 100%;
  margin-inline: auto;
  padding: 20px;

  @media (${({ theme }) => theme.devices.mobile}) {
    padding: 24px 20px;
  }

  line-height: 1.5;

  & h1 {
    font-size: 20px;
  }
  & h2 {
    font-size: 18px;
  }
  & h3 {
    font-size: 14px;
  }
  & em {
    font-style: italic;
  }
  & .align-left {
    text-align: left;
  }
  & .align-center {
    text-align: center;
  }
  & .align-right {
    text-align: right;
  }
`;

const Report = styled.div`
  text-align: right;
  margin-top: 24px;

  @media (${({ theme }) => theme.devices.mobile}) {
    margin-top: 44px;
  }

  & > button {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[700]};
    font-weight: ${({ theme }) => theme.fontWeight.regular};
    text-decoration: underline;
  }
`;
