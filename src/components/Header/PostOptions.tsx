import React from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { Link } from 'react-router-dom';
import { ReactComponent as PlusIcon } from 'assets/plus-icon.svg';
import useSelect from 'hooks/useSelect';
import { useRecoilValue } from 'recoil';
import { isLoginAtom } from 'recoil/atom';

const postOptions = [
  {
    title: '나의 텃밭 등록하기',
    description: '현재 가지고 있는 밭을 등록해요',
    link: '/create-my-garden',
  },
  {
    title: '분양하는 텃밭 등록하기',
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
  const isLogin = useRecoilValue(isLoginAtom);

  const handlePostBtnClick = () => {
    if (!isLogin) {
      alert('로그인 후 이용 가능합니다.');
    } else {
      toggleSelect();
    }
  };

  return (
    <>
      <PostBtn onClick={handlePostBtnClick}>
        <StyledPlusIcon />
        글쓰기
      </PostBtn>
      <MobilePostBtn onClick={handlePostBtnClick}>
        <StyledPlusIcon />
      </MobilePostBtn>
      {isOpen && (
        <>
          <SelectContainer>
            {postOptions.map(({ link, title, description }) => (
              <StyledLink to={link} key={link} onClick={closeSelect}>
                <Title>{title}</Title>
                <Description>{description}</Description>
              </StyledLink>
            ))}
          </SelectContainer>
          <MobileSelectContainer onClick={toggleSelect} />
          <MobileSelectBox>
            {postOptions.map(({ link, title, description }) => (
              <StyledLink to={link} key={link} onClick={closeSelect}>
                <Title>{title}</Title>
                <Description>{description}</Description>
              </StyledLink>
            ))}
          </MobileSelectBox>
        </>
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

const MobilePostBtn = styled.button`
  position: absolute;
  right: 0px;
  top: 700px;
  width: 52px;
  height: 52px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.green[500]};
  z-index: 1001;

  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: none;
  }
`;

const MobileSelectContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${({ theme }) => theme.colors.black};
  opacity: 0.5;
  z-index: 1000;

  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: none;
  }
`;

const MobileSelectBox = styled.div`
  position: absolute;
  right: 0;
  top: 450px;
  width: 228px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  z-index: 1001;

  @media (min-width: ${BREAK_POINT.TABLET}) {
    display: none;
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
  width: 300px;
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
