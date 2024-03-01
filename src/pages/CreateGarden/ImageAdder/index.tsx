import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
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
  const handleDelete = (image: string) => {
    setImageFiles(imageFiles.filter(({ src }) => src !== image));
  };

  useEffect(() => {}, []);

  return (
    <>
      <ImageSlider>
        <ImageBox>
          <ImageInput
            type="file"
            id="fileInput"
            multiple={true}
            accept="image/jpg,image/png,image/jpeg,image/gif"
            onChange={e => {
              const imageFiles = Object.values(e.target.files as FileList);

              //if (imageFiles.length > 10) {
              //  alert('이미지는 10개까지만 업로드 가능합니다.');
              //  return;
              //}

              setImageFiles(
                imageFiles.map(image => {
                  return {
                    file: image,
                    src: URL.createObjectURL(image),
                  };
                }),
              );
            }}
          />
          <ImageLabel htmlFor="fileInput">
            <div>
              <CameraIcon />
              <p>{imageFiles.length}/10</p>
            </div>
          </ImageLabel>
        </ImageBox>

        {imageFiles.map(({ src }) => (
          <ImageBox key={src}>
            <ImageDelBtn type="button">
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
  background-color: ${({ theme }) => theme.colors.green[100]};
  flex-shrink: 0;
`;

const ImageLabel = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
  border-radius: 10px;

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
    color: ${({ theme }) => theme.colors.green[500]};
  }

  & svg {
    fill: ${({ theme }) => theme.colors.green[500]} !important;
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
