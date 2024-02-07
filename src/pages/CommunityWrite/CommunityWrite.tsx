import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
// import { Editor, EditorState } from 'draft-js';
import CameraIcon from '../../assets/community/camera.svg';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

type Inputs = {
  title: string;
  content: string;
  images: Blob[];
  // 이미지 폼 데이터
};

const CommunityWrite = () => {
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<Blob[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const images = watch('images');

  useEffect(() => {
    if (!images) return;

    if (images.length > 10) {
      alert('이미지는 10개까지만 업로드 가능합니다.');
      return;
    }

    const imageFiles = Object.values(images);

    setImagesPreview(imageFiles.map(image => URL.createObjectURL(image)));
    setImageFiles(imageFiles);
  }, [images]);

  const onSubmit: SubmitHandler<Inputs> = ({ content, images, title }) => {
    console.log(imageFiles);
    const img = images[0];
    const formData = new FormData();
    formData.append('file', img);
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title>속닥속닥 글쓰기 페이지</title>
      </Helmet>
      <div>{/* 툴바 */}</div>

      <input placeholder="제목" {...register('title', { required: '필수 입력 항목입니다.' })} />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea
        placeholder="질문, 자랑, 공유 등 다양한 글을 작성해보세요."
        {...register('content', { required: '필수 입력 항목입니다.' })}
      />
      {errors.content && <p>{errors.content.message}</p>}

      <ImageContainer>
        <ImageBox>
          <ImageInput
            type="file"
            id="fileInput"
            multiple={true}
            accept="image/jpg,impge/png,image/jpeg,image/gif"
            {...register('images')}
          />
          <ImageAdder htmlFor="fileInput">
            <img src={CameraIcon} alt="사진 추가 아이콘" />
            <p>{imagesPreview.length} / 10</p>
          </ImageAdder>
        </ImageBox>

        {imagesPreview.map(image => (
          <ImageBox key={image}>
            <Image src={image} alt="이미지 미리보기" />
          </ImageBox>
        ))}
      </ImageContainer>

      <input type="submit" />
    </Container>
  );
};

export default CommunityWrite;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`;

const ImageContainer = styled.ul`
  display: flex;
`;

const ImageInput = styled.input`
  display: none;
`;

const ImageBox = styled.li`
  width: 100px;
  height: 100px;
  border: 1px solid #000;
`;

const ImageAdder = styled.label`
  display: block;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
