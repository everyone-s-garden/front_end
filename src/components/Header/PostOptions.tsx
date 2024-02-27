import React from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { Link } from 'react-router-dom';
import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg';
import useSelect from 'hooks/useSelect';

const postOptions = [
  {
    title: '나의 텃밭 등록하기',
    description: '현재 가지고 있는 밭을 등록해요',
    link: '/create-my-garden',
  },
  {
    title: '판매하는 텃밭 등록하기',
    description: '판매 할 개인 밭을 등록해요',
    link: '#',
  },
  // {
  //   title: '작물 거래 글쓰기',
  //   description: '다양한 작물을 판매하는 글을 등록해요',
  //   link: '/trading/write',
  // },
  {
    title: '속닥속닥 글쓰기',
    description: '질문, 자랑, 공유 등 다양한 글을 작성해요',
    link: '/community/write',
  },
];

const PostOptions = () => {
  const { toggleSelect, isOpen, closeSelect } = useSelect();

  return (
    <>
      <PostBtn onClick={toggleSelect}>
        <StyledPlusIcon />
        글쓰기
      </PostBtn>
      {isOpen && (
        <SelectContainer>
          {postOptions.map(({ link, title, description }) => (
            <StyledLink to={link} key={link} onClick={closeSelect}>
              <Title>{title}</Title>
              <Description>{description}</Description>
            </StyledLink>
          ))}
        </SelectContainer>
      )}
    </>
  );
};

const PostBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.green[500]};
  border-radius: 10px;
  padding: 8px 12px;
  display: none;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 500;

  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: flex;
  }
`;

const StyledPlusIcon = styled(PlusIcon)`
  width: 16px;
  height: 16px;
  & path {
    stroke: ${({ theme }) => theme.colors.white};
  }
`;

const SelectContainer = styled.div`
  position: absolute;
  right: 0;
  top: 50px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  display: none;
  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: block;
  }
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

const Description = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: #494949;
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  padding: 18px 0 21px 20px;
  text-decoration: none;
  border-bottom: 1px solid #d9d9d9;
  color: #000;
  &:hover {
    background-color: #f5f5f5;
  }
  &:first-of-type {
    border-radius: 10px 10px 0 0;
  }

  &:last-of-type {
    border-bottom: none;
    border-radius: 0 0 10px 10px;
  }
`;

export default PostOptions;
