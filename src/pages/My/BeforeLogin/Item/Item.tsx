import React from 'react';
import styled from 'styled-components';
import heart from '../../../../assets/heart.svg';

const Item = () => {
  return (
    <>
      <Li>
        <ImageBox>
          <Image src={heart} />
        </ImageBox>
        <TextBox>
          <First />
          <Second />
          <Third />
        </TextBox>
      </Li>
      <Li>
        <ImageBox>
          <Image src={heart} />
        </ImageBox>
        <TextBox>
          <First />
          <Second />
          <Third />
        </TextBox>
      </Li>
    </>
  );
};

export default Item;

const Li = styled.div`
  width: fit-content;
  margin-top: 17px;
  margin-right: 43px;
  display: flex;
  cursor: pointer;
`;
const ImageBox = styled.div`
  width: 218px;
  height: 164px;
  background-color: #f1f7e8;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  width: 45px;
  height: 38px;
`;
const TextBox = styled.div`
  width: fit-content;
  height: 100%;
  margin-left: 19px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const First = styled.div`
  width: 130px;
  height: 26px;
  background: #dee2dc;
  border-radius: 8px;
`;
const Second = styled.div`
  width: 89px;
  height: 19px;
  background: #edf0ec;
  border-radius: 7px;
  margin-top: 12px;
`;
const Third = styled.div`
  width: 119px;
  height: 19px;
  background: #edf0ec;
  border-radius: 7px;
  margin-top: 12px;
`;
