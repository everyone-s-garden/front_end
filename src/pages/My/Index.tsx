import { BREAK_POINT } from 'constants/style';
import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isFeedbackOpenAtom, windowOffsetAtom } from 'recoil/atom';
import LikePosts from './LikePosts/LikePosts';
import { AnimatePresence, easeIn, easeInOut, LayoutGroup, m, motion } from 'framer-motion';
import arrow from 'assets/icons_arrow-up.png';
import styled from 'styled-components';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { UserAdivce } from './Menu/Menu';

const myPageMobileRouter = [
  {
    id: Math.random() + 1,
    title: '나의 텃밭',
    child: [
      { id: Math.random() + 10, childTitle: '찜한 텃밭', path: 'my_gardens/like' },
      { id: Math.random() + 11, childTitle: '최근 본 텃밭', path: 'my_gardens/recent' },
      { id: Math.random() + 12, childTitle: '내가 올린 글', path: 'my_gardens/mypost' },
    ],
  },
  {
    id: Math.random() + 2,
    title: '작물 거래',
    child: [
      { id: Math.random() + 13, childTitle: '지역 인증하기', path: 'crop_trade/regional_certification' },
      { id: Math.random() + 14, childTitle: '판매 내역', path: 'crop_trade/sales_history' },
      { id: Math.random() + 15, childTitle: '구매 내역', path: 'crop_trade/purchase_history' },
      { id: Math.random() + 16, childTitle: '관심 목록', path: 'crop_trade/wishlist' },
    ],
  },
  {
    id: Math.random() + 3,
    title: '텃밭 관리',
    child: [
      // { id: Math.random() + 17, childTitle: '나의 분양중인 텃밭', path: 'garden_manage/my_garden_selling' },
      { id: Math.random() + 18, childTitle: '나의 텃밭', path: 'garden_manage/my_garden_using' },
      // { id: Math.random() + 19, childTitle: '내가 찜한 텃밭', path: 'garden_manage/like' },
    ],
  },
  {
    id: Math.random() + 4,
    title: '속닥속닥',
    child: [
      { id: Math.random() + 20, childTitle: '작성한 글 목록', path: 'whisper/my_post' },
      { id: Math.random() + 21, childTitle: '댓글 단 글', path: 'whisper/comment_post' },
      { id: Math.random() + 22, childTitle: '좋아요 누른 글', path: 'whisper/like' },
    ],
  },
];
interface IChildProps {
  id: number;
  childTitle: string;
  path: string;
}
interface IVariantProps {
  isOpen: boolean;
}
interface IAcrrodionProps {
  title: string;
  children: IChildProps[];
  nav: NavigateFunction;
}
const Accordion = ({ title, children, nav }: IAcrrodionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const accordionVariants = {
    initial: (isOpen: IVariantProps) => ({
      opacity: isOpen ? 0 : 1,
      maxHeight: isOpen ? 200 : 0,
    }),
    animate: (isOpen: IVariantProps) => ({
      opacity: isOpen ? 1 : 0,
      maxHeight: isOpen ? 200 : 0,
    }),
    exit: (isOpen: IVariantProps) => ({
      opacity: isOpen ? 0 : 1,
      maxHeight: isOpen ? 0 : 200,
    }),
  };

  const arrowVariants = {
    initial: (isOpen: IVariantProps) => ({
      rotate: isOpen ? 180 : 0,
    }),
    animate: (isOpen: IVariantProps) => ({
      rotate: isOpen ? 180 : 0,
    }),
  };

  return (
    <Li>
      <TitleWrapper onClick={toggleAccordion}>
        <span> {title}</span>
        <motion.img
          custom={isOpen}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: easeInOut }}
          variants={arrowVariants}
          src={arrow}
        />
      </TitleWrapper>
      <div style={{ overflow: 'hidden' }}>
        <AnimatePresence>
          <motion.ul
            custom={isOpen}
            variants={accordionVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.5, ease: easeInOut }}
            style={{ opacity: 0, maxHeight: 0 }}
          >
            {children.map(child => (
              <li key={child.id}>
                <Btn type="button" onClick={() => nav(child.path)}>
                  {child.childTitle}
                </Btn>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </Li>
  );
};

const Index = () => {
  const offset = useRecoilValue(windowOffsetAtom);
  const nav = useNavigate();
  const [isFeedBackOpen, setIsFeedBackOpen] = useRecoilState(isFeedbackOpenAtom);

  return (
    <>
      {offset.width <= BREAK_POINT.MOBILE_NUMBER ? (
        <ul>
          {myPageMobileRouter.map((routes, index) => {
            return (
              <Accordion nav={nav} title={routes.title} key={routes.id}>
                {routes.child}
              </Accordion>
            );
          })}
          <Li>
            <TitleWrapper onClick={() => setIsFeedBackOpen(true)}>유저의 소리함</TitleWrapper>
          </Li>
          <Li>
            <TitleWrapper onClick={() => nav('/setting')}>설정</TitleWrapper>
          </Li>
        </ul>
      ) : (
        <LikePosts />
      )}
    </>
  );
};

export default Index;

const Li = styled.li`
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 2px;
  padding-top: 20px;
`;

const TitleWrapper = styled.div`
  padding-bottom: 18px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  font-size: 16px;
  color: #9e9e9e;
  margin-bottom: 18px;
`;
