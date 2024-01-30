import { BREAK_POINT } from 'constants/style';
import React from 'react';
import styled from 'styled-components';

const LocationList = ({ children }: { children: string }) => {
  return (
    <Li>
      <RemoveButton>닫기</RemoveButton>
      <ListTextWrapper>{children}</ListTextWrapper>
    </Li>
  );
};

const RegiontalCertificate = () => {
  return (
    <Container>
      <div>
        <Title>내 위치 인증</Title>
        <Button>내 지역 인증하기</Button>
        <SubTitleWrapper>
          <span style={{ color: '#282828', fontSize: 18, fontWeight: 600, marginRight: 10 }}>선택된 지역</span>
          <span style={{ color: '#5A5A5A', fontSize: 16, fontWeight: 500 }}>최대 3개까지 지정 가능합니다.</span>
        </SubTitleWrapper>

        <LocationWrapper>
          <LocationList>서울특별시 강남구 역삼1동</LocationList>
          <LocationList>경기도 고양시 덕양구 행신동</LocationList>
          <LocationList>경기도 용인시 처인구 역삼동</LocationList>
        </LocationWrapper>
        <div style={{ display: 'flex' }}>
          <ConfirmButton>완료하기</ConfirmButton>
        </div>
      </div>
    </Container>
  );
};

export default RegiontalCertificate;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
`;

const Title = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 18px;
`;

const SubTitleWrapper = styled.div`
  margin-right: 17px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;
    span:first-child {
      margin-bottom: 10px;
    }
  }
`;

const Button = styled.button`
  display: flex;
  width: 455px;
  justify-content: center;
  align-items: center;
  background-color: #f1f7e4;
  padding: 16px 0px;
  color: #9ec646;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  margin-bottom: 80px;

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 350px;
    margin-bottom: 40px;
  }
`;

const Li = styled.li`
  display: flex;
  align-items: center;
`;

const ListTextWrapper = styled.span`
  background-color: #f1f7e4;
  flex: 1;
  padding: 16px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9ec646;
  margin-bottom: 10px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 16px;
`;

const RemoveButton = styled.button`
  margin-right: 12px;
  background-color: #5a5a5a;
  border-radius: 99px;
  color: white;
`;

const ConfirmButton = styled.button`
  width: 351px;
  padding: 19px 0px;
  background-color: #9ec646;
  color: white;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 600;
  margin-left: auto;
  margin-right: auto;
`;

const LocationWrapper = styled.ul`
  margin-bottom: 80px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-bottom: 40px;
  }
`;
