import React from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import styled from 'styled-components';
import icon from '../assets/search_icon.svg';

const Postcode = () => {
  const open = useDaumPostcodePopup('https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js');

  const handleComplete = (data: any) => {
    let fullAddress = data.address;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }

    console.log(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  return <PostBtn src={icon} onClick={handleClick} />;
};

export default Postcode;

const PostBtn = styled.img`
  width: 20px;
  height: 19px;
  position: absolute;
  top: 8px;
  right: 20px;
  cursor: pointer;
`;
