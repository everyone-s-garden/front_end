import { useGetRegionsName } from 'api/GardenAPI';
import { SearchIcon } from 'assets/community';
import useDebounce from 'hooks/useDebounce';
import React, { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { GardenFields } from 'types/Garden';

const CreateGarden = () => {
  const [gardenFields, setGardenFields] = useState<GardenFields>({
    gardenName: '',
    price: '',
    size: '',
    gardenStatus: 'ACTIVE',
    contact: '',
    address: '',
    latitude: 0,
    longitude: 0,
    isToilet: false,
    isWaterway: false,
    isEquipment: false,
    gardenDescription: '',
    recruitStartDate: '',
    recruitEndDate: '',
  });
  const [submitActive, setSubmitActive] = useState(false);
  const [regionVisible, setRegionVisible] = useState(false);

  const debouncedAddress = useDebounce(gardenFields.address, 500);
  const { data } = useGetRegionsName({ regionName: debouncedAddress });

  const validateDateRange = useCallback((start: string, end: string) => {
    if (!start || !end) {
      return true;
    }

    return new Date(start) <= new Date(end);
  }, []);

  useEffect(() => {
    console.log(gardenFields);
    Object.values(gardenFields).some(value => value.length === 0) ? setSubmitActive(false) : setSubmitActive(true);
  }, [gardenFields]);

  return (
    <>
      <Helmet>
        <title>분양 텃밭 등록하기 페이지</title>
      </Helmet>

      <Container>
        <Title>분양 텃밭 등록하기</Title>
        <form>
          <div>이미지 슬라이더</div>

          <FieldGroup>
            <InputBox>
              <TextInput
                placeholder="텃밭 이름"
                type="text"
                value={gardenFields.gardenName}
                onChange={({ target: { value } }) => setGardenFields({ ...gardenFields, gardenName: value })}
              />
            </InputBox>
            <InputBox>
              <TextInput
                placeholder="가격"
                type="number"
                value={gardenFields.price}
                onChange={({ target: { value } }) => setGardenFields({ ...gardenFields, price: value })}
              />
            </InputBox>
            <InputBox>
              <TextInput
                placeholder="면적(평)"
                type="number"
                value={gardenFields.size}
                onChange={({ target: { value } }) => setGardenFields({ ...gardenFields, size: value })}
              />
            </InputBox>
            <InputBox>
              <TextInput
                placeholder="연락처"
                type="tel"
                value={gardenFields.contact}
                onChange={({ target: { value } }) => {
                  if (/^\d+$/.test(value) || value === '') setGardenFields({ ...gardenFields, contact: value });
                }}
              />
            </InputBox>

            <InputBox>
              <FieldName>기간</FieldName>
              <input
                type="date"
                value={gardenFields.recruitStartDate}
                onChange={({ target: { value } }) => {
                  if (!validateDateRange(value, gardenFields.recruitEndDate)) {
                    alert('모집 종료일보다 늦을 수 없습니다.');
                    return;
                  }
                  setGardenFields({ ...gardenFields, recruitStartDate: value });
                }}
              />
              <input
                type="date"
                value={gardenFields.recruitEndDate}
                onChange={({ target: { value } }) => {
                  console.log(value);
                  if (!validateDateRange(gardenFields.recruitStartDate, value)) {
                    alert('모집 시작일보다 빠를 수 없습니다.');
                    return;
                  }
                  setGardenFields({ ...gardenFields, recruitEndDate: value });
                }}
              />
            </InputBox>
            <InputBox>
              <FieldName>상태</FieldName>
              <TypeBtn
                type="button"
                onClick={() => setGardenFields({ ...gardenFields, gardenStatus: 'ACTIVE' })}
                active={gardenFields.gardenStatus === 'ACTIVE'}
              >
                모집 중
              </TypeBtn>
              <TypeBtn
                type="button"
                onClick={() => setGardenFields({ ...gardenFields, gardenStatus: 'INACTIVE' })}
                active={gardenFields.gardenStatus === 'INACTIVE'}
              >
                마감
              </TypeBtn>
            </InputBox>
            <InputBox>
              <FieldName>위치</FieldName>
              <SearchBox>
                <input
                  placeholder="지역명을 입력해주세요."
                  value={gardenFields.address}
                  onChange={({ target: { value } }) => setGardenFields({ ...gardenFields, address: value })}
                  onFocus={() => setRegionVisible(true)}
                  onBlur={() => {
                    setRegionVisible(false);
                  }}
                />
                <SearchIcon />
                <RegeonList visible={regionVisible && data?.length !== 0}>
                  {data?.map((region, index) => (
                    <li
                      key={index}
                      onMouseDown={() => {
                        setGardenFields({
                          ...gardenFields,
                          address: region.position,
                          latitude: region.latitude,
                          longitude: region.longitude,
                        });
                      }}
                    >
                      {region.position}
                    </li>
                  ))}
                </RegeonList>
              </SearchBox>
            </InputBox>
            <InputBox>
              <FieldName>상태</FieldName>
              <TypeBtn
                type="button"
                onClick={() => setGardenFields({ ...gardenFields, isToilet: !gardenFields.isToilet })}
                active={gardenFields.isToilet}
              >
                화장실
              </TypeBtn>
              <TypeBtn
                type="button"
                onClick={() => setGardenFields({ ...gardenFields, isWaterway: !gardenFields.isWaterway })}
                active={gardenFields.isWaterway}
              >
                수로실
              </TypeBtn>
              <TypeBtn
                type="button"
                onClick={() => setGardenFields({ ...gardenFields, isEquipment: !gardenFields.isEquipment })}
                active={gardenFields.isEquipment}
              >
                농기구
              </TypeBtn>
            </InputBox>
            <Description
              placeholder="기간, 주의사항 등 상세 내용을 입력해주세요."
              value={gardenFields.gardenDescription}
              onChange={({ target: { value } }) => setGardenFields({ ...gardenFields, gardenDescription: value })}
            />
          </FieldGroup>

          <ButtonBox>
            <SubmitBtn disabled={!submitActive}>등록하기</SubmitBtn>
          </ButtonBox>
        </form>
      </Container>
    </>
  );
};

export default CreateGarden;

const Container = styled.section`
  position: absolute;
  width: 100%;
  z-index: 9999;
  background-color: #fff;
  top: 0;
  min-height: 100vh;
  max-width: 712px;
  margin-inline: auto;

  @media (${({ theme }) => theme.devices.mobile}) {
    position: static;
    min-height: auto;
    height: max-content;
  }

  & > form > *:not(:last-child) {
    padding-inline: 20px;
  }

  & > form > div:not(:last-child) {
    height: 166px;
  }
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  position: sticky;
  bottom: 0;
  z-index: 20;

  @media (${({ theme }) => theme.devices.mobile}) {
    position: static;
  }
`;

const Title = styled.h1`
  position: sticky;
  top: 0;
  height: 53px;
  line-height: 53px;
  z-index: 9999;
  background-color: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  font-size: 18px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  text-align: center;

  @media (${({ theme }) => theme.devices.mobile}) {
    position: static;
    height: fit-content;
    border: none;
  }
`;

const FieldGroup = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 20px;
  margin-bottom: 90px;

  @media (${({ theme }) => theme.devices.mobile}) {
    gap: 16px;
    margin-top: 20px;
    margin-bottom: 50px;
  }
`;

const InputBox = styled.div`
  min-height: 56px;
  display: flex;
  align-items: center;

  & * {
    font-size: 16px;
  }

  & input {
    min-height: 40px;
    height: 100%;
    width: 100%;
    border: none;

    &::placeholder {
      color: ${({ theme }) => theme.colors.gray[400]};
    }

    &[type='date'] {
      width: 100%;
      border-radius: 10px;
      background-color: ${({ theme }) => theme.colors.gray[50]};
      padding-inline: 10px;
      margin-right: 20px;

      @media (${({ theme }) => theme.devices.mobile}) {
        margin-right: 40px;
      }
    }

    &[type='number']::-webkit-inner-spin-button,
    &[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  & :last-child {
    margin-right: 0 !important;
  }
`;

const TextInput = styled.input`
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]} !important;
`;

const FieldName = styled.p`
  flex-shrink: 0;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  margin-right: 24px;
`;

const TypeBtn = styled.button<{ active?: boolean }>`
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.green[500] : theme.colors.gray[100])};
  border-radius: 10px;
  padding: 8px 10px;
  margin-right: 10px;
  background-color: ${({ theme, active }) => (active ? theme.colors.green[100] : 'transparent')};
  color: ${({ theme, active }) => (active ? theme.colors.black : theme.colors.gray[300])};
`;

const Description = styled.textarea`
  height: 160px;
  padding: 16px 12px;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  font-size: 16px;
  resize: none;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  border-radius: 10px;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
  }
`;

const SubmitBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.green[500]};
  color: white;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-size: 16px;
  height: 54px;
  width: 100%;

  &:disabled {
    background-color: ${({ theme }) => theme.colors.green[200]};
    cursor: default;
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    border-radius: 10px;
    max-width: 344px;
    margin-bottom: 100px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.gray[50]};
  position: relative;

  & > input {
    padding-left: 14px;
    background-color: transparent;
  }

  & > svg {
    margin-right: 14px;
    stroke: ${({ theme }) => theme.colors.gray[400]};
  }
`;

const RegeonList = styled.ul<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: 44px;
  height: max-content;
  overflow-y: auto;
  background-color: #fff;
  max-height: 235px;
  z-index: 10;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray[100]};
  box-shadow: 2px 0 6px 0 rgba(0, 0, 0, 0.1);

  @media (${({ theme }) => theme.devices.mobile}) {
    max-height: 217px;
  }

  & > li {
    height: 44px;
    font-size: 14px;
    font-weight: ${({ theme }) => theme.fontWeight.medium};
    padding-inline: 16px;
    display: flex;
    align-items: center;

    &:hover {
      background-color: ${({ theme }) => theme.colors.gray[50]};
    }
  }

  & > li:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[100]};
  }
`;
