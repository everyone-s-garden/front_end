import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

import searchIcon from 'assets/search.svg';
import { BREAK_POINT } from 'constants/style';
import formatDateInput from 'utils/formatDateInput';
import customAxios from 'utils/token';
import { useNavigate } from 'react-router-dom';
import { IProps, IData, IMyGarden } from './type';
import { AxiosResponse } from 'axios';
import { formValidation, getQueryData } from './query';

const Form = ({ editMatch, image, myGarden }: IProps) => {
  const { getValues, register, handleSubmit, setValue } = useForm();
  const [searchResults, setSearchResults] = useState<IData[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [selectedResult, setSelectedResult] = useState<IData | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const nav = useNavigate();
  const init = async () => {
    if (myGarden && myGarden.name) {
      setSearchText(myGarden.name);
      setSelectedResult((prev: IData | null) => {
        return {
          ...prev,
          id: myGarden.id,
          name: myGarden.name,
          address: myGarden.address,
          latitude: myGarden.latitude,
          longitude: myGarden.longitude,
        };
      });
      const startDate: string = myGarden.useStartDate.split('-').join('.');
      const endDate: string = myGarden.useEndDate.split('-').join('.');
      setValue('start', startDate);
      setValue('end', endDate);
    }
  };
  const getSearchResult = async (e: React.FormEvent<HTMLInputElement>) => {
    let query = e.currentTarget.value;
    setSearchText(query);
    if (query === '') {
      setSelectedResult(null);
      setSearchResults([]);
      setShow(false);
    } else {
      const res = (await getQueryData(query)) as AxiosResponse;
      setSearchResults(res.data);
      setShow(true);
    }
  };
  const selectGarden = (result: IData) => {
    setSearchText(result.name);
    setSelectedResult(result);
    setSearchResults([]);
    setShow(false);
  };
  const uploadMyGarden = async () => {
    const uploadData = {
      id: selectedResult?.id || 0,
      name: selectedResult?.name || '',
      image: image || null,
      address: selectedResult?.address || '',
      latitude: selectedResult?.latitude || 0,
      longitude: selectedResult?.longitude || 0,
      useStartDate: getValues('start'),
      useEndDate: getValues('end'),
    };
    const validation = formValidation(uploadData);
    try {
      if (validation) {
        const res = await customAxios.post('v1/garden/using', uploadData);
        if (res.status === 201) nav(-1);
      }
    } catch (err) {
      alert('날씨 형식이 올바르지 않습니다.');
    }
  };
  useEffect(() => {
    init();
  }, [myGarden, image]);
  const editMyGarden = async () => {
    const uploadData = {
      id: selectedResult?.id,
      name: selectedResult?.name,
      image,
      address: selectedResult?.address,
      latitude: selectedResult?.latitude,
      longitude: selectedResult?.longitude,
      useStartDate: getValues('start'),
      useEndDate: getValues('end'),
    };
    const validation = formValidation(uploadData);
    try {
      if (validation) {
        const res: AxiosResponse = await customAxios.put(`v1/garden/using/${myGarden?.id}`, uploadData);
        if (res.status === 200) nav(-1);
      }
    } catch (err) {
      alert('날씨형식이 올바르지않습니다.');
    }
  };

  return (
    <>
      <FormBox onClick={() => setShow(false)} onSubmit={handleSubmit(editMatch ? editMyGarden : uploadMyGarden)}>
        <FormItem>
          <ItemTag required>텃밭 정보</ItemTag>
          <Input onChange={getSearchResult} value={searchText} placeholder="텃밭 검색" />
          <SearchIcon src={searchIcon} />
          <SearchResult check={searchResults.length === 0} len={show}>
            <ResultUl>
              {searchResults.length === 0 ? (
                <NoResult>
                  <span>검색 결과가 없습니다.</span>
                  <span>정확한 검색어를 입력해주세요.</span>
                </NoResult>
              ) : (
                searchResults.map(result => (
                  <ResultLi onClick={() => selectGarden(result)} key={result.id}>
                    <span>{result.name !== '' ? result.name : result.address}</span>
                  </ResultLi>
                ))
              )}
            </ResultUl>
          </SearchResult>
        </FormItem>

        <FormItem>
          <ItemTag required>위치</ItemTag>
          <Input
            placeholder="검색시 자동으로 불러와져요"
            value={selectedResult ? selectedResult.address : ''}
            disabled
          />
        </FormItem>

        <Notification>직접 입력해주세요</Notification>
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
              <DateInput {...register('end')} placeholder="yyyy.mm.dd" type="text" onChange={e => formatDateInput(e)} />
            </DateInputBox>
          </DateContainer>
        </FormItem>
        <CompleteBtn>완료</CompleteBtn>
      </FormBox>
    </>
  );
};

export default Form;

const FormBox = styled.form`
  margin-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-grow: 1;
  }
`;

const SearchResult = styled.div<{ check: boolean; len: boolean }>`
  visibility: ${props => (props.len ? 'visibility' : 'hidden')};
  position: absolute;
  width: calc(100% - 86px);
  height: ${props => (props.check ? '110px' : '217px')};
  right: 0;
  top: 105%;
  background: #ffffff;
  border: 1px solid #f0f0f0;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.06);
  border-radius: 11px;
  z-index: 999;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: calc(100% - 80px);
    height: ${props => (props.check ? '90px' : '229px')};
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

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 80px;
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

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    font-size: 14px;
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

const Notification = styled.div`
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: #afafaf;
  font-size: 14px;
  font-weight: 400;
`;

const DateContainer = styled.div`
  width: 100%;
  display: flex;
  column-gap: 40px;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    column-gap: 15px;
  }
`;

const DateInputBox = styled.div`
  padding: 10px 14px;
  padding-bottom: 14px;
  flex-grow: 1;
  height: 64px;
  background-color: #f0f0f0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: #afafaf;
  font-size: 14px;
  font-weight: 400;
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
  width: 348px;
  height: 59px;
  color: #ffffff;
  font-size: 16px;
  font-weight: 400px;
  background-color: #414c38;
  border-radius: 15px;
  transition: all 0.1s ease-in;
  margin-top: 5px;
  &:hover {
    background-color: #646f5a;
  }
`;

const ResultUl = styled.ul`
  height: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #888 #e0ebd4;

  &::-webkit-scrollbar {
    display: block !important; /* Chrome, Safari, Opera*/
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 7px;
    border: 1px solid #f0f0f0;
  }
  &::-moz-scrollbar {
    width: 6px;
  }

  &::-moz-scrollbar-thumb {
    background-color: #888;
    border-radius: 7px;
  }

  &::-moz-scrollbar-track {
    background-color: white;
    border-radius: 7px;
    border: 1px solid #f0f0f0;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    align-items: center;
    width: 100%;
    height: 100%;

    &::-webkit-scrollbar {
      display: none !important; /* Chrome, Safari, Opera*/
    }
  }
`;

const ResultLi = styled.li`
  height: 20%;
  display: flex;
  align-items: center;
  border-bottom: 1.15625px solid #f0f0f0;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: -0.08em;
  color: #414c38;
  cursor: pointer;
  span {
    margin-left: 15px;
  }
`;

const NoResult = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: row;
  span {
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: #c8c8c8;
    margin-right: 5px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    flex-direction: column;
  }
`;
