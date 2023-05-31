import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import searchIcon from 'assets/search.svg';
import { BREAK_POINT } from 'constants/style';
import formatDateInput from 'utils/formatDateInput';
import customAxios from 'utils/token';

interface IImage {
  id: string;
  imageUrl: string;
}

interface IProps {
  image: IImage | null;
}

const Form = ({ image }: IProps) => {
  const { watch, getValues, register } = useForm();

  const getPost = () => {};
  const uploadMyGarden = async () => {};

  const init = async () => {
    const res = await customAxios.get('/v1/garden');
    console.log(res);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <FormBox onSubmit={uploadMyGarden}>
        <FormItem>
          <ItemTag required>텃밭 정보</ItemTag>
          <Input placeholder="텃밭 검색" />
          <SearchIcon src={searchIcon} />
        </FormItem>

        <FormItem>
          <ItemTag required>위치</ItemTag>
          <Input placeholder="검색시 자동으로 불러와져요" disabled />
        </FormItem>

        <FormItem>
          <ItemTag required>기간</ItemTag>
          <DateContainer>
            <DateInputBox>
              사용 시작일
              <DateInput
                {...register('start')}
                placeholder="yyyy.mm.dd"
                type="text"
                onChange={e => formatDateInput(e)}
              />
            </DateInputBox>
            <DateInputBox>
              사용 종료일
              <DateInput {...register('end')} placeholder="yyyy.mm.dd" type="text" />
            </DateInputBox>
          </DateContainer>
        </FormItem>
      </FormBox>

      <CompleteBtn>완료</CompleteBtn>
    </>
  );
};

export default Form;

const FormBox = styled.form`
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-grow: 1;
  }
`;

const FormItem = styled.div`
  margin-bottom: 40px;
  position: relative;
  display: flex;
  width: 100%;
`;

const ItemTag = styled.div<{ required?: boolean }>`
  flex-shrink: 0;
  width: 86px;
  display: flex;
  align-items: center;
  color: #414c38;
  font-size: 16px;
  font-weight: 500;

  &::after {
    visibility: ${props => (props.required ? 'visible' : 'hidden')};
    content: '*';
    color: #ff6a00;
  }
`;

const Input = styled.input`
  padding: 14px;
  width: 100%;
  height: 46px;
  color: #414c38;
  font-size: 16px;
  font-weight: 400;
  background-color: #f0f0f0;
  border: none;
  border-radius: 11px;

  ::placeholder {
    color: #afafaf;
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  right: 14px;
  top: 10px;
  cursor: pointer;
  transition: 0.1s ease-in-out;

  &:hover {
    scale: 1.1;
  }
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  column-gap: 15px;
`;

const DateInputBox = styled.div`
  padding: 10px 14px;
  padding-bottom: 14px;
  flex-grow: 1;
  min-width: 90px;
  max-width: 140px;
  height: 64px;
  background-color: #f0f0f0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #afafaf;
  font-size: 14px;
  font-weight: 400;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 123px;
  }
`;

const DateInput = styled.input`
  width: 100%;
  color: #414c38;
  font-size: 14px;
  font-weight: 400;
  border: none;
  background: inherit;
  margin: 0 auto;

  ::placeholder {
    color: #afafaf;
  }
`;

const CompleteBtn = styled.button`
  width: 100%;
  max-width: 340px;
  height: 50px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400px;
  background-color: #414c38;
  border-radius: 15px;
  transition: all 0.1s ease-in;

  &:hover {
    background-color: #646f5a;
  }
`;
