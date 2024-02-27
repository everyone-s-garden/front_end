import React, { useState } from 'react';
import styled from 'styled-components';
import { ReactComponent as CameraIcon } from 'assets/camera-icon.svg';
import { ReactComponent as DeleteIcon } from 'assets/delete-icon.svg';

interface GardenImageInputProps {
  images: {
    file: Blob;
    src: string;
  }[];
  setImages: React.Dispatch<
    React.SetStateAction<
      {
        file: Blob;
        src: string;
      }[]
    >
  >;
}

const GardenImageInput = ({ images, setImages }: GardenImageInputProps) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length >= 10) return;

    const imageFiles = Array.from(files).map(file => {
      return {
        file,
        src: URL.createObjectURL(file),
      };
    });

    setImages([...images, ...imageFiles]);
  };

  const handleDeleteImage = (file: Blob) => {
    setImages(prev => prev.filter(image => image.file !== file));
  };

  return (
    <Container>
      <ImageBox>
        <ImageAddButton
          type="file"
          alt="이미지 추가 버튼"
          accept="image/png, image/jpeg, image/jpg"
          multiple
          onChange={handleImageChange}
          id="imageInput"
        />
        <ImageLabel htmlFor="imageInput">
          <StyledCameraIcon />
          <ImageLength>{images.length} / 10</ImageLength>
        </ImageLabel>
      </ImageBox>
      {images.map((image, index) => (
        <ImagePreview key={image.src}>
          <Image key={index} src={image.src} alt={`Image ${index + 1}`} />
          <DeleteButton>
            <DeleteIcon onClick={() => handleDeleteImage(image.file)} />
          </DeleteButton>
        </ImagePreview>
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0 10px 20px 10px;
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const ImageBox = styled.div`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.green[100]};
  border-radius: 10px;

  @media ${({ theme }) => theme.devices.mobile} {
    width: 166px;
    height: 166px;
  }
`;

const ImageLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  cursor: pointer;
`;

const StyledCameraIcon = styled(CameraIcon)`
  width: 29px;
  height: 29px;
  @media ${({ theme }) => theme.devices.mobile} {
    width: 34px;
    height: 34px;
  }
`;

const ImageLength = styled.p`
  color: ${({ theme }) => theme.colors.green[500]};
  font-size: 14px;

  @media ${({ theme }) => theme.devices.mobile} {
    font-size: 16px;
  }
`;

const ImageAddButton = styled.input`
  display: none;
`;

const ImagePreview = styled.div`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  position: relative;

  @media ${({ theme }) => theme.devices.mobile} {
    max-width: 232px;
    width: 100%;
    height: 166px;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;

const DeleteButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.gray[400]};
  background-color: ${({ theme }) => theme.colors.white};
  position: absolute;
  right: 5px;
  top: 5px;
`;

export default GardenImageInput;
