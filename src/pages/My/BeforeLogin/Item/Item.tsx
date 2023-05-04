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
  margin-right: 34px;
  display: flex;
  cursor: pointer;
  margin-bottom: 19px;
`;
const ImageBox = styled.div`
  width: 178px;
  height: 132px;
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
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const First = styled.div`
  width: 105px;
  height: 21px;
  background: #dee2dc;
  border-radius: 8px;
`;
const Second = styled.div`
  width: 72px;
  height: 15px;
  background: #edf0ec;
  border-radius: 7px;
  margin-top: 12px;
`;
const Third = styled.div`
  width: 96px;
  height: 15px;
  background: #edf0ec;
  border-radius: 7px;
  margin-top: 12px;
`;
