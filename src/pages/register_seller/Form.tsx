import React, { useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { useForm } from 'react-hook-form';
import icon from '../../assets/search_icon.svg';
import { useDaumPostcodePopup } from 'react-daum-postcode';

import handleComplete from 'components/PostCode';
import { useNavermaps } from 'react-naver-maps';
import customAxios from 'utils/token';
interface IImage {
  id: string;
  imageUrl: string;
}
interface IProps {
  images: IImage[];
}

interface ILocation {
  address: string;
  lat: string;
  lng: string;
}
const Form = ({ images }: IProps) => {
  const { register, watch, getValues, handleSubmit } = useForm();
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');
  const [location, setLocation] = useState<ILocation>();
  const uploadField = async () => {
    const uploadData = {
      name: getValues('name'),
      price: getValues('name'),
      size: getValues('size'),
      address: location?.address,
      latitude: location?.lat,
      longitude: location?.lng,
      images,
    };
    const res = await customAxios.post('/v1/garden', uploadData);
    console.log(res);
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
    <InfoBox onSubmit={handleSubmit(uploadField)}>
      <Content1>
        <span>텃밭 이름*</span>
        <FormInput>
          <input {...register('name')} />
        </FormInput>
      </Content1>
      <Content2>
        <span>가격</span>
        <FormInput>
          <input {...register('price')} />
          <Unit>원</Unit>
        </FormInput>
      </Content2>
      <Content3>
        <span>면적</span>
        <FormInput>
          <input {...register('size')} />
          <Unit>평</Unit>
        </FormInput>
      </Content3>
      <Content4>
        <span>상태</span>
        <FormInput>
          <div>
            <Circle />
            모집 중
          </div>
          <div>상시모집</div>
          <div>마감</div>
        </FormInput>
      </Content4>
      <Content5>
        <span style={{ marginTop: '8px' }}>위치</span>
        <div>
          <span>{location?.address ? location.address : '위치검색'}</span>
          <PostBtn onClick={getPost} src={icon}></PostBtn>
        </div>
      </Content5>
      <Content4>
        <span>시설</span>
        <FormInput>
          <div>화장실</div>
          <div>수도시설</div>
          <div>농기구</div>
        </FormInput>
      </Content4>
      <Content6>
        <span>상세내용</span>
        <textarea placeholder="화장실, 수로 등 상세 내용을 입력해주세요." />
      </Content6>
      <BtnBox>
        <Btn>완료</Btn>
      </BtnBox>
    </InfoBox>
  );
};

export default Form;
const InfoBox = styled.form`
  width: 497px;
  display: flex;
  flex-direction: column;
  div {
    height: fit-content;
  }
  span {
    font-weight: 400;
    font-size: 16px;
    color: #000000;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      white-space: nowrap;
    }
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 334px;
  }
`;

const Content1 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 44px;
  div {
    input {
      width: 334px;
      border: none;
      border-bottom: 1.3px solid #afd082;
      @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
        width: 234px;
      }
    }
  }
  span {
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      margin-right: 45px;
    }
  }
`;
const Content2 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 49px;
  div {
    input {
      width: 87px;
      border: none;
      border-bottom: 1.3px solid #afd082;
      @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
        width: 61px;
      }
    }
  }
  span {
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      margin-right: 80px;
    }
  }
`;
const Content3 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 43px;
  div {
    input {
      width: 49px;
      border: none;
      border-bottom: 1.3px solid #afd082;
      @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
        width: 35px;
      }
    }
  }
  span {
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      margin-right: 80px;
    }
  }
`;
const Content4 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 66px;
  span {
    margin-top: 10px;
    margin-right: 70px;
  }
  div {
    display: flex;
    justify-content: space-between;
    div {
      font-size: 16px;
      color: #d9d9d9;
      background-color: rgba(255, 255, 255, 0.8);
      border: 1.3px solid #d9d9d9;
      border-radius: 9px;
      padding: 6px 16px;
      width: fit-content;
      display: flex;
      align-items: center;
      cursor: pointer;
      @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
        font-size: 12px;
        padding: 6px 9px;
      }
    }
    div:nth-child(2) {
      padding: 6px 18px;
      @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
        padding: 6px 9px;
      }
    }
    :nth-child(3) {
      padding: 6px 16px;
      @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
        padding: 6px 12px;
      }
    }
  }
`;
const Content5 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 66px;

  div {
    position: relative;
    width: 334px;
    height: 37px;
    background: #f0f0f0;
    border-radius: 11px;
    display: flex;
    align-items: center;
    cursor: default;
    span {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #c8c8c8;
      width: 80%;
      padding-left: 5%;
      font-size: 13px;
    }
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      width: 234px;
    }
  }
`;
const Content6 = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  textarea {
    width: 338px;
    height: 164px;
    border: 1px solid #bec8b3;
    border-radius: 16px;
    resize: none;
    padding: 21px 22px;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      width: 237px;
    }
  }
`;

const FormInput = styled.div`
  width: 341px;
  display: flex;
  height: fit-content;
  input {
    padding: 8px 12px;
    text-align: center;
    @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
      margin-top: 0;
      padding: 0;
    }
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    align-items: center;
  }
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: end;
`;
const Btn = styled.button`
  width: 348px;
  height: 59px;
  background: #414c38;
  border-radius: 15px;
  margin-top: 36px;
  margin-bottom: 52px;
`;

const Circle = styled.div`
  width: 9px !important;
  height: 9px !important;
  background: #d9d9d9 !important;
  border-radius: 4.5px !important;
  padding: 0 !important;
  margin-right: 10px;
`;

const Unit = styled.span`
  display: block;
  margin-top: 6px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 0;
  }
`;
const PostBtn = styled.img`
  width: 20px;
  height: 19px;
  position: absolute;
  top: 8px;
  right: 20px;
  cursor: pointer;
`;
