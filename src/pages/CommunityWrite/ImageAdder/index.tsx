import React, { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Post } from '../types';
import { CameraIcon } from 'assets/community';

interface ImageAdderProps {
  imageFiles: {
    file: Blob;
    src: string;
  }[];
  setImageFiles: React.Dispatch<
    React.SetStateAction<
      {
        file: Blob;
        src: string;
      }[]
    >
  >;
}

const ImageAdder = ({ imageFiles, setImageFiles }: ImageAdderProps) => {
  const {
    setValue,
    getValues,
    watch,
    register,
    formState: { errors },
  } = useFormContext<Post>();

  const images = watch('images');

  const handleDelete = (image: string) => {
    setImageFiles(imageFiles.filter(({ src }) => src !== image));
  };

  useEffect(() => {
    if (!images || !images.length) return;

    const imageFiles = Object.values(images);

    if (images.length > 10) {
      alert('이미지는 10개까지만 업로드 가능합니다.');

      setImageFiles(
        imageFiles.slice(0, 10).map(image => {
          return {
            file: image,
            src: URL.createObjectURL(image),
          };
        }),
      );

      return;
    }

    setImageFiles(
      imageFiles.map(image => {
        return {
          file: image,
          src: URL.createObjectURL(image),
        };
      }),
    );
  }, [images, setImageFiles]);

  return (
    <ImageContainer>
      <ImageBox>
        <ImageInput
          type="file"
          id="fileInput"
          multiple={true}
          accept="image/jpg,image/png,image/jpeg,image/gif"
          {...register('images', { required: '이미지를 추가해주세요.' })}
        />
        <ImageLabel htmlFor="fileInput" errorState={!!errors.images}>
          <div>
            <CameraIcon />
            <p>{imageFiles.length}/10</p>
          </div>
        </ImageLabel>
      </ImageBox>

      {imageFiles.map(({ src }) => (
        <ImageBox key={src}>
          <ImageDelBtn onClick={() => handleDelete(src)}>X</ImageDelBtn>
          <Image src={src} alt="이미지 미리보기" />
        </ImageBox>
      ))}
    </ImageContainer>
  );
};

export default ImageAdder;

const ImageContainer = styled.ul`
  display: flex;
  margin: 0 auto;
  padding-top: 34px;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[100]};
  gap: 14px;
  width: 100%;
  max-width: 1188px;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageBox = styled.li`
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.orange[100]};
`;

const ImageLabel = styled.label<{ errorState?: boolean }>`
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid ${({ errorState, theme }) => (errorState ? theme.colors.error : 'none')};

  & div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    gap: 8px;
  }

  & p {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.orange[600]};
  }
`;

const ImageDelBtn = styled.button`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: white;
  border-radius: 50%;
  padding: 5px;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;
