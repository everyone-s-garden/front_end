import React from 'react';
import styled from 'styled-components';
import profile_image from 'assets/my/profile-image.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import kakao_icon from 'assets/icon-kakao-small.png';
import { BREAK_POINT } from 'constants/style';
const EditUserProfile = () => {
  return (
    <Container>
      <Content>
        <H1Wrapper>
          <h1>개인정보 수정</h1>
        </H1Wrapper>
        <Form>
          <span>계정정보</span>
          <ImageWrapper>
            <img src={profile_image} />
            <CameraIconWrapper>
              <FontAwesomeIcon icon={faCamera} />
            </CameraIconWrapper>
          </ImageWrapper>
          <Input placeholder="텃린이" />
          <Explanation>한글, 영어, 숫자만 사용할 수 있어요.</Explanation>
          <span>연락처</span>
          <div style={{ marginBottom: 51, position: 'relative' }}>
            <Input placeholder="0103*******" />
            <ChangeButton>변경</ChangeButton>
          </div>

          <span>SNS 연동</span>
          <SNSWrapper>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>
                <img style={{ borderRadius: 99 }} src={kakao_icon} />
              </div>
              <span style={{ marginLeft: 8 }}>카카오톡</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ marginRight: 8 }}>연결됨</span>
              <CloseIconWrapper>
                <FontAwesomeIcon icon={faClose} />
              </CloseIconWrapper>
            </div>
          </SNSWrapper>
        </Form>
      </Content>
    </Container>
  );
};

export default EditUserProfile;

const Container = styled.section`
  flex: 1;
  padding-top: 47px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding-top: 15px;
  }
`;

const Content = styled.div`
  width: 100%;
  max-width: 662px;
  margin-left: auto;
  margin-right: auto;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    padding: 0px 20px;
  }
`;

const H1Wrapper = styled.div`
  width: 100%;
  padding-top: 12px;
  padding-bottom: 18px;
  text-align: center;
  h1 {
    font-size: 24px;
    font-weight: 700;
    color: #282828;
    margin-bottom: 10px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const ImageWrapper = styled.div`
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  margin-bottom: 51px;
`;

const Form = styled.form`
  span {
    font-size: 18px;
    font-weight: 600;
    color: #282828;
  }
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 99px;
  background-color: #d7d7d7;
  padding: 5px;
  cursor: pointer;
`;

const Input = styled.input`
  padding: 10px 0px;
  border: none;
  border-bottom: 1px solid #d7d7d7;
  width: 100%;
  margin-bottom: 10px;
  ::placeholder {
    color: #282828;
    font-size: 16px;
    font-weight: 500;
  }
`;

const Explanation = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #bebebe;
  margin-bottom: 51px;
`;

const SNSWrapper = styled.div`
  padding: 10px 0px;
  border: none;
  border-bottom: 1px solid #d7d7d7;
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
  }
  span {
    font-size: 16px;
    font-weight: 500;
  }
`;
const CloseIconWrapper = styled.div`
  border-radius: 99px;
  background-color: #d7d7d7;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ChangeButton = styled.button`
  border: 1px solid #5a5a5a;
  border-radius: 10px;
  padding: 4px 8px;
  position: absolute;
  right: 0;
  font-size: 14px;
  font-weight: 500;
  color: #5a5a5a;
`;
