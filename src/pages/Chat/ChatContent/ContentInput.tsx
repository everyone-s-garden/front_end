import React from 'react';
import styled from 'styled-components';

const ContentInput = () => {
  return (
    <Container>
      <Btn>+</Btn>
      <Form>
        <Input />
        <SendBtn>전송</SendBtn>
      </Form>
      <Btn>📎</Btn>
    </Container>
  );
};

const Container = styled.div`
  height: 155px;
  width: 100%;
  position: absolute;
  bottom: 0;
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 24px 18px;
  gap: 16px;
`;

const Btn = styled.button`
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  background-color: aliceblue;
`;

const Form = styled.form`
  width: 100%;
  position: relative;
`;

const SendBtn = styled(Btn)`
  background-color: #1dcf70;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  color: #fff;
`;

const Input = styled.input`
  height: 107px;
  width: 100%;
  border-radius: 10px;
`;

export default ContentInput;
