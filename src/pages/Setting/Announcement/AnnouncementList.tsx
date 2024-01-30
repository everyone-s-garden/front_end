import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const list = [
  { id: 1, text: '모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.' },
  { id: 2, text: '모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.' },
  { id: 3, text: '모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.' },
  { id: 4, text: '모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.' },
  { id: 5, text: '모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.' },
  { id: 6, text: '모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.' },
  { id: 7, text: '모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.' },
  { id: 8, text: '모두의 텃밭에서 더 좋은 서비스제공을 위해 업데이트 될 예정이에요.' },
];

const AnnouncementList = () => {
  const nav = useNavigate();
  return (
    <>
      <ul>
        {list.map((item, idx) => {
          return (
            <Li onClick={() => nav(`detail/${item.id}`)} key={item.id}>
              {' '}
              {item.text}
            </Li>
          );
        })}
      </ul>
    </>
  );
};

export default AnnouncementList;

const Li = styled.li`
  padding: 12px 0px 33px 20px;
  border-bottom: 1px solid #d7d7d7;
  cursor: pointer;
`;
