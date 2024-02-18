import ImageAdder from 'pages/Community/CommunityWrite/ImageAdder';
import React, { useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import GardenNameInput from './GardenNameInput';
import GardenLocation from './GardenLocation';
import GardenTerm from './GardenTerm';
import { GardenForNameSearch } from 'types/Garden';
import { useCreateMyGarden } from 'api/GardenAPI';
import { useNavigate } from 'react-router-dom';

const CreateMyGarden = () => {
  const navigate = useNavigate();
  const { mutate: createMyGarden } = useCreateMyGarden();
  const [garden, setGarden] = useState<GardenForNameSearch | null>(null);
  const [term, setTerm] = useState({
    useStartDate: '',
    useEndDate: '',
  });

  const handleSubmit = () => {
    createMyGarden({ gardenId: garden!.gardenId, useStartDate: term.useStartDate, useEndDate: term.useEndDate });
    navigate('/my-garden');
  };

  return (
    <Container>
      <Title>나의 텃밭 등록하기</Title>
      <Form>
        <GardenNameInput setGarden={setGarden} />
        <GardenLocation garden={garden} />
        <GardenTerm term={term} setTerm={setTerm} />
        <Description placeholder="텃밭에 대한 설명을 입력해주세요." />
        <Button onClick={handleSubmit}>등록하기</Button>
      </Form>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 670px;
  width: 100%;
  margin: 0 auto;
  position: absolute;
  top: 0;
  z-index: 1000;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.white};

  @media ${({ theme }) => theme.devices.mobile} {
    position: relative;
    z-index: 0;
  }
`;

const Title = styled.h1`
  font-size: 18px;
  width: 100%;
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  padding: 20px 0;
  margin-bottom: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};

  @media ${({ theme }) => theme.devices.mobile} {
    margin-bottom: 20px;
    padding: 0;
    border: none;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 0 10px;
  & > div {
    @media ${({ theme }) => theme.devices.mobile} {
      border-bottom: ${({ theme }) => theme.colors.gray[100]} 1px solid;
    }
  }
`;

const Button = styled.button`
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green[500]};
  width: 100%;
  height: 56px;
  opacity: 0.5;
  position: absolute;
  left: 0;
  bottom: 0;

  @media ${({ theme }) => theme.devices.mobile} {
    position: relative;
    border-radius: 10px;
    width: 350px;
  }
`;

const Description = styled.textarea`
  width: 100%;
  height: 160px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray[100]}`};
  border-radius: 10px;
  resize: none;
  padding: 20px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export default CreateMyGarden;
