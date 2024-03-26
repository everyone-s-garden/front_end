import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { BREAK_POINT, COLOR } from 'constants/style';
import closeIcon from 'assets/x-icon.svg';
import copyIcon from 'assets/contact/copy.svg';
import callIcon from 'assets/contact/call.svg';
import emailIcon from 'assets/contact/email.svg';
import sadIcon from 'assets/contact/sad_face.svg';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { NotiContentAtom, selectedGardenIdAtom } from 'recoil/atom';
import { GardenDetailType } from 'api/type';
import { useNavigate } from 'react-router-dom';
import { GardenAPI } from 'api/GardenAPI';
import { useCreateGardenChatRoom } from 'api/ChatAPI';

interface ContactGardenModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  postData: GardenDetailType | null;
}

function ContactGardenModal({ isOpen, setIsOpen, postData }: ContactGardenModalProps) {
  const selectedGarden = useRecoilValue(selectedGardenIdAtom);
  const setContent = useSetRecoilState(NotiContentAtom);
  const navigate = useNavigate();
  const { mutate: createChatRoom } = useCreateGardenChatRoom();

  const [isCallNTextAvail, setIsCallNTextAvail] = useState<boolean>(true);
  const isDesktopEnv = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    ? false
    : true;

  const fetchGardenData = async () => {
    if (!selectedGarden) return;
    const { data } = await GardenAPI.getGardenDetail(selectedGarden);
    return data;
  };

  useEffect(() => {
    let timer: any;
    if (!isCallNTextAvail) {
      timer = setTimeout(() => {
        setIsCallNTextAvail(true);
      }, 5000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [isCallNTextAvail]);

  if (!postData) return null;

  const onCopyClicked = () => {
    navigator.clipboard.writeText(postData.contact);
    setContent('복사 되었습니다.');
  };

  const onCallClicked = () => {
    if (isDesktopEnv === true || !postData.contact) {
      setIsCallNTextAvail(false);
      return;
    }

    window.location.href = `tel:+82${postData.contact.replaceAll('-', '')}`;
  };

  const onChattingClicked = async () => {
    // if (isDesktopEnv === true || !postData.contact) {
    //   setIsCallNTextAvail(false);
    //   return;
    // }

    // window.location.href = `sms:+82${postData.contact.replaceAll('-', '')}`;
    if (postData.roomId === -1) {
      createChatRoom({ postId: postData.gardenId, writerId: postData.writerId });
      const newData = await fetchGardenData();
      if (newData) {
        navigate(`/chat/${newData.roomId}`);
      }
    } else {
      navigate(`/chat/${postData.roomId}`);
    }
  };

  return (
    <ModalBackground isOpen={isOpen} onClick={() => setIsOpen(false)}>
      <ModalContainer
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <CloseIcon src={closeIcon} alt="close" onClick={() => setIsOpen(false)} />

        <ModalContent>
          {postData ? (
            <>
              <ModalTitle>연락하기</ModalTitle>
              <CopyContact>
                {postData.contact}
                <button onClick={onCopyClicked}>
                  <img src={copyIcon} />
                </button>
              </CopyContact>
              <Buttons>
                <button onClick={onCallClicked}>
                  <img src={callIcon} />
                  연락하기
                </button>
                <button onClick={onChattingClicked}>
                  <img src={emailIcon} />
                  채팅하기
                </button>
              </Buttons>
              <Instruction isCallNTextAvail={isCallNTextAvail}>연락하기는 모바일에서만 가능해요</Instruction>
            </>
          ) : (
            <Container>
              <SadFace src={sadIcon} />
              <h4>정보가 없어요</h4>
              <p>
                링크 업로드가 안되어 있거나
                <br />
                별도 링크가 없는 경우에요.
              </p>
            </Container>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalBackground>
  );
}

export default ContactGardenModal;

const ModalBackground = styled.div<{ isOpen: boolean }>`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  opacity: ${props => (props.isOpen ? '1' : '0')};
  position: fixed;
  z-index: 1000;
  padding-top: 270px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  transition: all 0.2s ease-in;
`;

const ModalContainer = styled.div`
  position: relative;
  background-color: ${COLOR.BACKGROUND};
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 340px;
  height: 230px;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const CloseIcon = styled.img`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 18px;
  cursor: pointer;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const ModalTitle = styled.h1`
  color: #414c38;
  font-size: 18px;
  font-weight: 500;
`;

const CopyContact = styled.div`
  margin-top: 20px;
  padding: 0 20px;
  height: 55px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #414c38;
  font-size: 16px;
  font-weight: 500;
  border: 1px solid #d9d9d9;
  border-radius: 9px;
`;

const Buttons = styled.div`
  margin-top: 10px;
  display: flex;
  column-gap: 22px;

  & > button {
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 15px;
    color: #414c38;
    text-align: center;
    font-size: 16px;
    font-weight: 500;
    background-color: #f1f7e8;
    border-radius: 6px;
  }
`;

const Instruction = styled.p<{ isCallNTextAvail: boolean }>`
  margin: 0 auto;
  margin-top: 16px;
  color: ${props => (props.isCallNTextAvail ? '#afafaf' : '#EE8E34')};
  font-size: 12px;
  font-weight: 400;
  transition: all 0.2s ease-in;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #414c38;

  & > h4 {
    margin-top: 18px;
    font-size: 18px;
    font-weight: 500;
  }

  & > p {
    margin-top: 8px;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    line-height: 24px;
  }
`;

const SadFace = styled.img`
  margin-top: 20px;
  width: 66px;
  height: 66px;
`;
