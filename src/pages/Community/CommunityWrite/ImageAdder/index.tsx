import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import { Post } from '../types';
import { CameraIcon, DeleteIcon } from 'assets/community';
import ImageSlider from './ImageSlider';

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
    <>
      <ImageSlider>
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
            <ImageDelBtn>
              <DeleteIcon onClick={() => handleDelete(src)} />
            </ImageDelBtn>
            <Image src={src} alt="이미지 미리보기" />
          </ImageBox>
        ))}
      </ImageSlider>
    </>
  );
};

export default ImageAdder;

const ImageInput = styled.input`
  display: none;
`;

const ImageBox = styled.li`
  position: relative;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.colors.orange[100]};
  flex-shrink: 0;
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
  top: 5px;
  right: 5px;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
`;
