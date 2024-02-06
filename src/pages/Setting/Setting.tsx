import { BREAK_POINT } from 'constants/style';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const settingRouter = [
  {
    id: 1,
    name: '고객 센터 도움말',
    subRouter: [
      { id: 2, subName: '공지사항', route: '/announcement' },
      { id: 3, subName: '자주 묻는 질문', route: '/faq' },
    ],
  },
  {
    id: 4,
    name: '정보 수정',
    subRouter: [{ id: 5, subName: '개인정보수정', route: '/edit_profile' }],
  },
  {
    id: 7,
    name: '회원 정보',
    subRouter: [{ id: 8, subName: '회원 탈퇴', route: '/delete_account' }],
  },
];

const Setting = () => {
  const nav = useNavigate();
  return (
    <Container>
      <Header>
        <h1>설정</h1>
        <h2>고객센터 및 정보 수정을 할 수 있어요</h2>
      </Header>
      <Ul>
        {settingRouter.map((routes, idx) => {
          return (
            <li key={routes.id}>
              <UlTitle>{routes.name}</UlTitle>
              <ul>
                {routes.subRouter.map((route, idx) => {
                  return (
                    <Li key={route.id} onClick={() => nav(route.route)}>
                      {route.subName}
                    </Li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </Ul>
    </Container>
  );
};

export default Setting;

const Container = styled.div`
  flex: 1;
<<<<<<< HEAD
=======
  padding-bottom: 100px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    /* padding-bottom: 0; */
  }
>>>>>>> ce0ea358495b325daec7f900e8123b46fa009f0f
`;

const Header = styled.div`
  flex: 1;
  height: 218px;
  background-color: #f1f7e4;
  display: flex;
  flex-direction: column;
  padding-top: 42px;
  align-items: center;
  h1 {
    color: #282828;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 16px;
    font-weight: 400;
    color: #5a5a5a;
  }
  margin-bottom: 48px;
  @media screen and (max-width: ${BREAK_POINT.MOBILE}) {
    display: none;
  }
`;

const Ul = styled.ul`
  width: 100%;
  max-width: 662px;
  margin-left: auto;
  margin-right: auto;
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
