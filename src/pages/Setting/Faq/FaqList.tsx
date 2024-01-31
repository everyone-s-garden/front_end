import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const settingRouter = [
  {
    id: 1,
    name: '내 주변 분양',
    subRouter: [
      {
        id: 2,
        subName: '거래할 때, 결제는 어떤식으로 해야하나요?',
        content: '판매자의 계좌번호를 채팅을 통해 확인 후, 결제를 할 수 있습니다.',
      },
    ],
  },
  {
    id: 3,
    name: '작물 거래',
    subRouter: [
      {
        id: 5,
        subName: '배송은 어떻게 해야하나요?',
        content:
          '1. 직거래 \n-직거래는 거래 날짜 및 시간을 정하고 직접 거래를\n통해서 거래가 완료됩니다.\n\n2.택배\n-판매자가 택배를 보내고, 구매자는 채팅으로 운송장 번호를 받으실 수 있으며, 거래가 완료됩니다.',
      },
      {
        id: 6,
        subName: '거래 과정을 알려주세요',
        content:
          '1.내 주변 분양 \n-원하는 텃밭을 선택 후, 연락하기 버튼을 통해 연락을 직접하거나, 채팅을 통해 거래를 할 수 있습니다.\n\n작물거래\n-원하는 작물을 선택 후, 상세페이지에서 채팅하기 버튼을 통해 거래할 수 있습니다. ',
      },
      {
        id: 7,
        subName: '지역설정을 어떻게 해야하나요?',
        content: '1.각 글쓰기 내에서 지역 설정이 가능합니다.\n( 속닥속닥 글쓰기 제외)',
      },
    ],
  },
  {
    id: 8,
    name: '속닥 속닥',
    subRouter: [
      {
        id: 9,
        subName: '속닥속닥 이란?',
        content:
          '1.평소 텃밭을 가꾸면서 궁금했던 점을 물어볼 수 있어요.\n2.텃밭에 대해 알고 있는 팁들을 공유해요.\n3.텃밭을 자랑해요.',
      },
      { id: 10, subName: '태그 이용 방법을 알려드려요?', content: '속닥속닥' },
    ],
  },
  {
    id: 11,
    name: '채팅',
    subRouter: [
      {
        id: 12,
        subName: '판매자와 채팅은 어떻게 하나요?',
        content:
          '1.내 주변 분양 \n-원하는 텃밭을 고른뒤, 채팅하기 버튼을 클릭하여 채팅을 시작하면 됩니다.\n\n작물거래\n-원하는 작물 선택 뒤, 상세페이지에서 채팅하기 버튼을 클릭하여 시작하면 됩니다',
      },
      { id: 13, subName: '채팅 메시지를 삭제할 수 있나요?', content: '채팅' },
      { id: 14, subName: '모바일과 PC 버전은 동일한가요?', content: '채팅 내용 등 동일하게 보여집니다.' },
      {
        id: 15,
        subName: '약속기능은 어떤 기능인가요?',
        content:
          '1.정해놓은 날짜, 장소, 시간 등을 설정을 해놓고  약속을 \n알람해주는 기능입니다.\nPC 버전, 모바일 버전 둘 다, 대화창에서 버튼을 클릭하면, 약속을 지정할 수 있습니다.',
      },
    ],
  },
  {
    id: 16,
    name: '회원 계정',
    subRouter: [
      {
        id: 17,
        subName: '회원 탈퇴 후 재가입을 할 수 있나요?',
        content: '회원 탈퇴 후 7일 이후에 재가입할 수 있습니다.',
      },
      {
        id: 18,
        subName: '회원 탈퇴를 하고 싶어요.',
        content: '마이페이지 - 설정 - 회원 탈퇴를 통해 회원 탈퇴를 하실 수 있습니다.',
      },
      {
        id: 19,
        subName: '회원탈퇴 시 개인정보는 삭제되나요?',
        content:
          '탈퇴 시 개인정보는 지체없이 삭제됩니다.\n법령에서 일정기간 정보의 보관을 규정하거나 서비스 운영상 반드시 필요한 경우 개인정보 처리방침에 공개한\n내용과 같이 일정한 기간 동안 관련된 개인정보를 보관 후 파기합니다. ',
      },
      {
        id: 20,
        subName: '회원정보 변경은 어디에서 하나요?',
        content: '마이페이지 - 설정 - 개인정보수정을 통해 변경이 가능합니다.',
      },
      {
        id: 21,
        subName: '비밀번호를 변경하고 싶어요.',
        content: '마이페이지 - 설정 - 비밀번호 변경을 통해 변경이 가능합니다.',
      },
    ],
  },
];

const FaqList = () => {
  const nav = useNavigate();
  return (
    <Ul>
      {settingRouter.map((routes, idx) => {
        return (
          <li key={routes.id}>
            <UlTitle>{routes.name}</UlTitle>
            <ul>
              {routes.subRouter.map((route, idx) => {
                return (
                  <Li
                    key={route.id}
                    onClick={() => nav('detail', { state: { title: route.subName, content: route.content } })}
                  >
                    {route.subName}
                  </Li>
                );
              })}
            </ul>
          </li>
        );
      })}
    </Ul>
  );
};

export default FaqList;

const Ul = styled.ul`
  width: 100%;
  max-width: 662px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 48px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    margin-top: 0;
  }
`;

const UlTitle = styled.div`
  background-color: #f1f7e4;
  border-bottom: 1px solid #d7d7d7;
  padding: 18px 0px 14px 33.95px;
  color: #5a5a5a;
  font-size: 16px;
  font-weight: 500;
`;

const Li = styled.li`
  border-bottom: 1px solid #d7d7d7;
  padding: 18px 0px 14px 33.95px;
  font-size: 16px;
  font-weight: 500;
  color: #282828;
  cursor: pointer;
`;
