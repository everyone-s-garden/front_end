import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BREAK_POINT } from 'constants/style';
import { useForm } from 'react-hook-form';
import icon from '../../assets/search_icon.svg';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import handleComplete from 'utils/PostCode';
import customAxios from 'utils/token';
import { IProps, ILocation, IUploadData, IFaclity, IStates } from './type';
import { UploadData, inputContactFormat, inputPriceFormat, inputSizeFormat, uncommaPrice } from './query';
import { useNavigate } from 'react-router-dom';

const Form = ({ images, location, setLocation }: IProps) => {
  const open = useDaumPostcodePopup(`${process.env.REACT_APP_DAUM_API_URL}`);
  const nav = useNavigate();
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [contact, setContack] = useState('');
  const { handleSubmit, getValues, register, watch } = useForm();
  const [facility, setFacility] = useState({
    toilet: false,
    channel: false,
    equip: false,
  });
  const [states, setStates] = useState({
    recruiting: false,
    end: false,
    regular: false,
  });
  const getPost = () => {
    open({
      onComplete: async location => {
        const data: ILocation | undefined = await handleComplete(location);
        if (data) {
          setLocation(data);
        }
      },
    });
  };

  const uploadField = async () => {
    if (location?.address && location.lat && location.lng) {
      const uploadImage = images.map(image => image.id);
      const uploadPrice = await uncommaPrice(price);
      const uploadData: IUploadData = {
        name: getValues('name'),
        price: uploadPrice,
        size,
        contact,
        address: location?.address,
        latitude: location?.lat,
        longitude: location?.lng,
        images: uploadImage,
      };
      console.log(uploadData);
      const res = await UploadData(uploadData);
      if (res.status === 200) nav('/');
    }
  };
  const handleToilet = () => {
    setFacility((prev: IFaclity) => ({
      ...prev,
      toilet: !prev.toilet,
    }));
  };
  const handleChannel = () => {
    setFacility((prev: IFaclity) => ({
      ...prev,
      channel: !prev.channel,
    }));
  };
  const handleEquip = () => {
    setFacility((prev: IFaclity) => ({
      ...prev,
      equip: !prev.equip,
    }));
  };
  const handleRecruiting = () => {
    setStates((prev: IStates) => ({
      recruiting: true,
      end: false,
      regular: false,
    }));
  };
  const handleRegular = () => {
    setStates((prev: IStates) => ({
      recruiting: false,
      end: false,
      regular: true,
    }));
  };
  const handleEnd = () => {
    setStates((prev: IStates) => ({
      recruiting: false,
      end: true,
      regular: false,
    }));
  };
  return (
    <Wrapper>
      <InfoBox onSubmit={handleSubmit(uploadField)}>
        <InputWrapper>
          <Input {...register('name')} placeholder="텃밭 이름" />
        </InputWrapper>
        <InputWrapper>
          {price.toString() !== '' && <Won>₩</Won>}
          <Input
            value={price}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setPrice(inputPriceFormat(e.currentTarget.value))}
            placeholder="가격"
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            value={size}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setSize(inputPriceFormat(e.currentTarget.value))}
            placeholder="면적(평)"
            style={{ width: '60px', minWidth: 'initial' }}
          />
          {size !== '' && <span>평</span>}
        </InputWrapper>
        <InputWrapper>
          <Input
            value={contact}
            onChange={(e: React.FormEvent<HTMLInputElement>) => setContack(inputContactFormat(e.currentTarget.value))}
            placeholder="연락처"
          />
        </InputWrapper>
        <StateBox>
          <span>상태</span>
          <RecruitingBtn state={states.recruiting} onClick={handleRecruiting}>
            <Circle state={states.recruiting} />
            모집 중
          </RecruitingBtn>
          <ReqularBtn state={states.regular} onClick={handleRegular}>
            상시모집
          </ReqularBtn>
          <EndBtn state={states.end} onClick={handleEnd}>
            마감
          </EndBtn>
        </StateBox>
        <Location>
          <div>
            <span>위치</span>
            {location.address !== '' && <span>{location.address}</span>}
          </div>
          <img onClick={getPost} src={icon} />
        </Location>
        <Facility>
          <span>시설</span>
          <ToiletBtn toilet={facility.toilet} onClick={handleToilet}>
            화장실
          </ToiletBtn>
          <ChannelBtn channel={facility.channel} onClick={handleChannel}>
            수로
          </ChannelBtn>
          <EquipBtn equip={facility.equip} onClick={handleEquip}>
            농기구
          </EquipBtn>
        </Facility>
        <TextArea placeholder="기간, 주의사항 등 상세 내용을 입력해주세요." />
        <UploadBtn>완료</UploadBtn>
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
    width: 100%;
  }
`;
const Input = styled.input`
  font-family: 'Pretendard';
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 20px;
  border: none;
  min-width: 120px;
  ::placeholder {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 20px;
    color: #d1d3d7;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
  }
`;
const InputWrapper = styled.div`
  width: 664px;
  padding: 21px 12px;
  border: 0;
  border-bottom: 0.5px solid #e1e1e1;
  display: flex;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 100%;
  }
`;

const Won = styled.span`
  margin-right: 10px;
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
  div {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 8px;
    padding: 6px 10px;
    border: 1px solid #afafaf;
    margin-right: 16px;
    display: flex;
    color: #afafaf;
    align-items: center;
    font-size: 12px;
    cursor: pointer;
  }
`;

const RecruitingBtn = styled.div<{ state: boolean }>`
  border: ${props => (props.state ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.state ? 'black' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const ReqularBtn = styled.div<{ state: boolean }>`
  border: ${props => (props.state ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.state ? 'black' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const EndBtn = styled.div<{ state: boolean }>`
  border: ${props => (props.state ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.state ? 'black' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const ToiletBtn = styled.div<{ toilet: boolean }>`
  border: ${props => (props.toilet ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.toilet ? 'black' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const ChannelBtn = styled.div<{ channel: boolean }>`
  border: ${props => (props.channel ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.channel ? 'black' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
`;
const EquipBtn = styled.div<{ equip: boolean }>`
  border: ${props => (props.equip ? '1px solid  #AFAFAF' : '1px solid #d9d9d9')} !important;
  color: ${props => (props.equip ? 'black' : '#d9d9d9')} !important;
  transition: 0.3s ease-in-out;
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
  div {
    display: flex;
    align-items: center;
    span {
      margin-right: 45px;
    }
  }
`;
const Circle = styled.div<{ state: boolean }>`
  width: 9px !important;
  height: 9px !important;
  border-radius: 5px;
  padding: 0px !important;
  background: ${props => (props.state ? 'black' : '#d9d9d9')} !important;
  margin-right: 5px !important;
  transition: 0.3s ease-in-out;
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
  div {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid #d9d9d9;
    border-radius: 16.7033px;
    padding: 6px 10px;
    margin-right: 16px;
    color: #d9d9d9;
    font-size: 12px;
    cursor: pointer;
  }
`;

const StateBtn = styled.div`
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid #d9d9d9;
  border-radius: 16.7033px;
  padding: 6px 10px;
  margin-right: 16px;
  color: #d9d9d9;
  font-size: 12px;
`;
const TextArea = styled.textarea`
  height: 300px;
  margin-top: 5px;
  padding: 19px 12px;
  border: 0;
  resize: none;

  outline-color: white;
  :focus {
    border-color: white;
  }
  ::placeholder {
    color: #c8c8c8;
  }
`;

const UploadBtn = styled.button`
  width: 348px;
  height: 59px;
  background-color: #d9d9d9;
  margin: 20px auto;
  border-radius: 15px;
  color: white;
  font-weight: 600;
  font-size: 19px;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  :hover {
    background: #414c38;
    color: white;
  }
`;
