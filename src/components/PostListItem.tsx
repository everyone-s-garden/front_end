import { IPostListItem } from 'api/type';
import { BREAK_POINT } from 'constants/style';
import React, { useState } from 'react';
import { useMatch } from 'react-router-dom';
import styled from 'styled-components';
import IconHeart from './icon/HeartIcon';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import IconCheck from './icon/CheckIcon';
import { reportPostIdAtom } from 'recoil/atom';

interface IProps {
  items: IPostListItem[];
}
interface OpenStates {
  [key: number]: boolean;
}
const PostListItem = ({ items }: IProps) => {
  const likeMatch = useMatch('/my/my_gardens/like');
  const myPostMatch = useMatch('/my/my_gardens/mypost');
  const salesHistoryMatch = useMatch('/my/crop_trade/sales_history');
  const wishListMatch = useMatch('/my/crop_trade/wishlist');
  const whisperMyPostMatch = useMatch('/my/whisper/my_post');
  const commentPostMatch = useMatch('/my/whisper/comment_post');
  const whisperLikeMatch = useMatch('/my/whisper/like');
  const whisperPost = useMatch('/my/whisper/my_post');
  const [openStates, setOpenStates] = useState<OpenStates>({});
  const [checkBoxOpen, setCheckBoxOpen] = useState(false);
  const toggleOpen = (id: number) => {
    setOpenStates(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Contaner>
      {(myPostMatch || salesHistoryMatch || whisperPost) && (
        <MobileEditWrapper>
          {!checkBoxOpen && <button onClick={() => setCheckBoxOpen(true)}>편집</button>}
          {checkBoxOpen && (
            <div style={{ display: 'flex' }}>
              <button>삭제</button>
              <div style={{ margin: '0px 12px', width: 1, height: '100%', backgroundColor: '#D7D7D7' }} />
              <button onClick={() => setCheckBoxOpen(false)}>취소</button>
            </div>
          )}
        </MobileEditWrapper>
      )}
      {items.map((item, idx) => {
        return (
          <Li key={item.gardenId}>
            <ImageWrapper>
              <img src={item.images[0]} />
              {(likeMatch || wishListMatch || whisperLikeMatch) && (
                <div>
                  <IconHeart fill="white" />
                </div>
              )}
              {idx === 3 && <ReportedOverlay />}
              {checkBoxOpen && (
                <CheckBox checked={openStates[item.gardenId]} onClick={() => toggleOpen(item.gardenId)}>
                  <IconCheck fill="white" />
                </CheckBox>
              )}
            </ImageWrapper>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Title>{item.gardenName}</Title>
              <MobileSpanWrapper>
                <span>평당 {item.price.toLocaleString()} 원</span>
                <span>/ {item.size} 평</span>
              </MobileSpanWrapper>
              <PCspan style={{ color: '#5A5A5A', marginBottom: 8 }}>{item.size}평</PCspan>
              <PCspan style={{ color: '#282828' }}>평당 {item.price.toLocaleString()}원</PCspan>
              {idx === 3 && <ReportedSpan>신고가 접수된 게시물입니다.</ReportedSpan>}
              <MobileEditButton>수정하기</MobileEditButton>
            </div>
            {(myPostMatch || salesHistoryMatch || whisperMyPostMatch || commentPostMatch) && (
              <MenuButtonWrapper onClick={() => toggleOpen(item.gardenId)} style={{}}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </MenuButtonWrapper>
            )}
            {openStates[item.gardenId] && (
              <EditButtonWrapper>
                <button>게시글 수정</button>
                <button>삭제하기</button>
              </EditButtonWrapper>
            )}
          </Li>
        );
      })}
    </Contaner>
  );
};

export default PostListItem;
const Contaner = styled.div`
  flex: 1;
`;

const Li = styled.li`
  display: flex;
  padding-bottom: 12px;
  margin-bottom: 32px;
  position: relative;
  padding-right: 10px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 16px;
  }
`;
const ImageWrapper = styled.div`
  height: 122px;
  flex-shrink: 0;
  border-radius: 8px;
  margin-right: 24px;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
  div {
    position: absolute;
    left: 8px;
    top: 8px;
    z-index: 99;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media screen and (max-width: ${BREAK_POINT.TABLET}) {
    margin-right: 10px;
  }

  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    width: 111px;
    height: 122px;
  }
`;

const EditButtonWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 20px;
  width: 111px;
  height: 120px;
  display: flex;
  flex-direction: column;

  button {
    border: 1px solid #d7d7d7;
    height: 60px;
  }
  button:first-child {
    border-bottom: none;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  button:last-child {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const PCspan = styled.span`
  margin-bottom: 8px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;
const Title = styled.span`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    font-size: 16px;
    font-weight: 600;
  }
`;
const MobileSpanWrapper = styled.div`
  display: none;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    span:first-child {
      font-size: 16px;
      font-weight: 600;
      color: #282828;
      margin-right: 5px;
    }
    span:last-child {
      font-size: 14px;
      font-weight: 400;
      color: #5a5a5a;
    }
  }
`;

const ReportedSpan = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #ef2b2a;
`;

const MobileEditButton = styled.button`
  display: none;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: auto;
    display: flex;
    border-radius: 6px;
    background-color: #9ec646;
    color: white;
    font-size: 14px;
    font-weight: 600;
    height: 32px;
    align-items: center;
    justify-content: center;
  }
`;

const MobileEditWrapper = styled.div`
  display: none;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    justify-content: flex-end;
    margin-top: 16px;
    padding-bottom: 12px;
  }
`;

const ReportedOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.5);
  width: 100% !important;
  height: 100% !important;
  position: absolute !important;
  left: 0 !important;
  top: 0 !important;
  border-radius: 10px;
`;

const CheckBox = styled.div<{ checked: boolean }>`
  width: 24px !important;
  height: 24px !important;
  border-radius: 4px !important;
  position: absolute;
  left: 8px;
  top: 8px;
  z-index: 99;
  background-color: ${props => (props.checked ? '#9EC646' : '#fff')};
`;

const MenuButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;
