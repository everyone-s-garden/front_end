import React, { useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { useForm } from 'react-hook-form';
import icon from '../../assets/search_icon.svg';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import handleComplete from 'utils/PostCode';
import customAxios from 'utils/token';
import { IProps, ILocation, IUploadData } from './type';
import { UploadData } from './query';

const Form = ({ images }: IProps) => {
  const { register, watch, getValues, handleSubmit } = useForm();
  const open = useDaumPostcodePopup(`${process.env.REACT_APP_DAUM_API_URL}`);
  const [location, setLocation] = useState<ILocation>();

  const uploadField = async () => {
    if (location?.address && location.lat && location.lng) {
      const uploadData: IUploadData = {
        name: getValues('name'),
        price: getValues('name'),
        size: getValues('size'),
        address: location?.address,
        latitude: location?.lat,
        longitude: location?.lng,
        images,
      };
      const res = await UploadData(uploadData);
      console.log(res);
    }
  };
  const getPost = () => {
    open({
      onComplete: async location => {
        const data: ILocation | undefined = await handleComplete(location);
        setLocation(data);
      },
    });
  };
  return (
    <Wrapper>
      <InfoBox onSubmit={handleSubmit(uploadField)}>
        <Input placeholder="텃밭 이름" />
        <Input placeholder="가격" />
        <Input placeholder="면적(평)" />
        <Input placeholder="연락처" />
        <StateBox>
          <span>상태</span>
          <button>
            <Circle />
            모집중
          </button>
          <button>상시모집</button>
          <button>마감</button>
        </StateBox>
        <Location>
          <span>위치</span>
          <img onClick={getPost} src={icon} />
        </Location>
        <Facility>
          <span>시설</span>
          <button>화장실</button>
          <button>수로</button>
          <button>농기구</button>
        </Facility>
        <TextArea placeholder="기간, 주의사항 등 상세 내용을 입력해주세요." />
      </InfoBox>
    </Wrapper>
  );
};

export default Form;

const Wrapper = styled.div`
  border: none;
  border-top: 0.5px solid #e1e1e1;
`;
const InfoBox = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 334px;
  }
`;
const Input = styled.input`
  width: 664px;
  padding: 21px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  ::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    color: #d1d3d7;
  }
`;

const StateBox = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  span {
    margin-right: 45px;
  }
  button {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #d9d9d9;
    border-radius: 8px;
    padding: 6px 10px;
    margin-right: 16px;
    color: #d9d9d9;
    display: flex;
    align-items: center;
  }
`;

const Location = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 21px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  img {
    cursor: pointer;
  }
`;
const Circle = styled.div`
  width: 9px;
  height: 9px;
  border-radius: 5px;
  background: #d9d9d9;
  margin-right: 5px;
`;
const Facility = styled.div`
  display: flex;
  align-items: center;
  padding: 15px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  span {
    margin-right: 45px;
  }
  button {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #d9d9d9;
    border-radius: 16.7033px;
    padding: 6px 10px;
    margin-right: 16px;
    color: #d9d9d9;
  }
`;

const TextArea = styled.textarea`
  height: 300px;
  margin-top: 5px;
  padding: 19px 12px;
  border: 0;
  resize: none;
  margin-bottom: 100px;
  outline-color: white;
  :focus {
    border-color: white;
  }
  ::placeholder {
    color: #c8c8c8;
  }
`;
