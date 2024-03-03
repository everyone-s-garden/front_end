import React from 'react';
import styled from 'styled-components';
import { ReactComponent as IconETC } from 'assets/chat/etc-icon.svg';
import useSelect from 'hooks/useSelect';

const SELECT_ITEMS = ['채팅방 나가기', '신고하기'];

const BtnItems = () => {
  const { closeSelect, toggleSelect, isOpen } = useSelect();

  return (
    <BtnWrapper>
      <ReviewBtn>후기 보내기</ReviewBtn>
      <ETCBtn onClick={toggleSelect} onBlur={closeSelect}>
        <IconETC />
      </ETCBtn>
      {isOpen && (
        <SelectContainer>
          {SELECT_ITEMS.map((item, idx) => (
            <button key={idx}>{item}</button>
          ))}
        </SelectContainer>
      )}
    </BtnWrapper>
  );
};

const BtnWrapper = styled.div`
  display: flex;
  gap: 10px;
  position: relative;
`;

const ReviewBtn = styled.button`
  font-size: 16px;
  font-weight: 600;
  background-color: ${({ theme }) => theme.colors.orange[300]};
  padding: 8px;
  border-radius: 10px;
  width: 100%;

  @media ${({ theme }) => theme.devices.tablet} {
    padding: 10px 28px;
  }
`;

const ETCBtn = styled.button`
  display: none;

  @media ${({ theme }) => theme.devices.tablet} {
    display: flex;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 8px;
    background-color: ${({ theme }) => theme.colors.orange[300]};
    border-radius: 10px;
  }
`;

const SelectContainer = styled.div`
  position: absolute;
  bottom: -100px;
  right: 0;
  z-index: 100000;
  width: 224px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 10px;
  display: none;

  @media ${({ theme }) => theme.devices.tablet} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  button {
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    width: 100%;
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[200]};
    padding: 13px 11px;

    &:last-child {
      border-bottom: none;
    }
  }
`;

export default BtnItems;
