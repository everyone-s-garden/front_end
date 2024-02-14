import { useGetUser } from 'api/UserAPI';
import React from 'react';
import DefaultProfile from 'assets/default-profile.png';
import styled from 'styled-components';

const Author = ({ authorId }: { authorId: number }) => {
  const { data: user } = useGetUser(authorId);

  if (!user) {
    return <Container />;
  }

  return (
    <Container>
      <Image src={user.profileImageUrl ?? DefaultProfile} alt="작성자 프로필 이미지" />
      <Nickname>
        <span>{user.nickname}</span>
        {/* TODO: 텃밭 페이지로 */}
        <button onClick={() => {}}>텃밭 보러 가기</button>
      </Nickname>
      <Grade>
        <span>{user.memberMannerGrade}</span>
        {/* TODO: 등급 안내로 */}
        <button onClick={() => {}}>등급 안내</button>
      </Grade>
    </Container>
  );
};

export default Author;

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  max-width: 1194px;
  width: 100%;
  height: 80px;
  margin-inline: auto;
  padding: 20px;
  margin-bottom: 20px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};

  @media (${({ theme }) => theme.devices.mobile}) {
    padding-inline: 7.5px;
    gap: 12px;
  }
`;

const Image = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  object-fit: cover;
`;

const Nickname = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 4px;

  & span {
    font-size: 18px;
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }

  & button {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray[700]};
    text-align: left;
  }
`;

const Grade = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  gap: 4px;

  & span {
    font-size: 14px;
  }

  & button {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray[700]};
    text-decoration: underline;
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    & span {
      font-size: 16px;
      font-weight: ${({ theme }) => theme.fontWeight.semiBold};
    }
  }
`;
