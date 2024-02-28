import React from 'react';
import DefaultProfile from 'assets/default-profile.png';

interface AuthorProps {
  userInfo: {
    userId: number;
    profile: string | null;
    name: string;
    memberMannerGrade: string;
  };
}

const Author = ({ userInfo }: AuthorProps) => {
  return (
    <>
      <img src={userInfo.profile ?? DefaultProfile} alt="작성자 프로필 이미지" />
      <span>{userInfo.name}</span>
    </>
  );
};

export default Author;
