import React, { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useForm, SubmitHandler } from 'react-hook-form';
import CameraIcon from '../../assets/community/camera.svg';
import theme from 'styles/theme';
import DraftEditor from './DraftEditor';
import { useCreatePost } from 'api/CommunityAPI';

type Inputs = {
  title: string;
  content: string;
  images: Blob[];
};

const CommunityWrite = () => {
  const [isActive, setIsActive] = useState(false);
  const [imageFiles, setImageFiles] = useState<
    {
      file: Blob;
      src: string;
    }[]
  >([]);
  const { mutate: createPost } = useCreatePost();

  const buttonRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    // formState: { errors },
  } = useForm<Inputs>();

  const title = watch('title');
  const content = watch('content');
  const images = watch('images');

  useEffect(() => {
    if (title && content && images) {
      if (images.length && buttonRef.current && buttonRef.current.classList.contains('error')) {
        buttonRef.current.classList.remove('error');
      }
      setIsActive(true);

      return;
    }

    setIsActive(false);
  }, [title, content, images]);

  useEffect(() => {
    if (!images || !images.length) return;

    if (images.length > 10) {
      alert('이미지는 10개까지만 업로드 가능합니다.');
      return;
    }

    const imageFiles = Object.values(images);

    setImageFiles(
      imageFiles.map(image => {
        return {
          file: image,
          src: URL.createObjectURL(image),
        };
      }),
    );
  }, [images]);

  const onSubmit: SubmitHandler<Inputs> = ({ content, title }) => {
    if (!imageFiles.length && buttonRef.current && !buttonRef.current.classList.contains('error')) {
      buttonRef.current.classList.add('error');
    }

    const formData = new FormData();

    /** 속닥속닥 게시글 blob */
    const jsonBlob = new Blob([JSON.stringify({ title, content, postType: 'QUESTION' })], { type: 'application/json' });

    imageFiles.forEach(({ file }) => {
      formData.append('images', file);
    });
    formData.append('texts', jsonBlob);

    createPost(formData, {
      onSuccess(data) {
        console.log(data);
      },
    });
  };

  const onDelete = (image: string) => {
    setImageFiles(imageFiles.filter(({ src }) => src !== image));
  };

  return (
    <Container onSubmit={handleSubmit(onSubmit)}>
      <Helmet>
        <title>속닥속닥 글쓰기 페이지</title>
      </Helmet>

      <h1>글쓰기</h1>
      <div style={{ border: '0.1rem solid', width: '100%' }}>
        <DraftEditor />
      </div>

      <ToolBar>{/* 툴바 */}툴바</ToolBar>

      <Content>
        <div>
          <input placeholder="제목" {...register('title', { required: '필수 입력 항목입니다.' })} />
          {title !== undefined && !title.length && <p>필수 입력 항목입니다.</p>}
        </div>

        <div>
          <textarea
            placeholder="질문, 자랑, 공유 등 다양한 글을 작성해보세요."
            {...register('content', { required: '필수 입력 항목입니다.' })}
          />
          {content !== undefined && !content.length && <p>필수 입력 항목입니다.</p>}
        </div>
      </Content>

      <ImageContainer>
        <ImageBox>
          <ImageInput
            type="file"
            id="fileInput"
            multiple={true}
            accept="image/jpg,image/png,image/jpeg,image/gif"
            {...register('images')}
          />
          <ImageAdder htmlFor="fileInput">
            <div ref={buttonRef}>
              <img src={CameraIcon} alt="사진 추가 아이콘" />
              <p>{imageFiles.length}/10</p>
            </div>
          </ImageAdder>
        </ImageBox>

        {imageFiles.map(({ src }) => (
          <ImageBox key={src}>
            <ImageDelBtn onClick={() => onDelete(src)}>X</ImageDelBtn>
            <Image src={src} alt="이미지 미리보기" />
          </ImageBox>
        ))}
      </ImageContainer>

      <SubmitBtn type="submit" value="등록하기" disabled={!isActive} className={isActive ? '' : 'disabled'} />
    </Container>
  );
};

export default CommunityWrite;

const Container = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 35px;
  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
  height: 80vh;
  margin-bottom: 100px;

  & .disabled {
    background-color: ${theme.colors.orange[200]};
    cursor: default;
  }
`;

const ToolBar = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  border-top: 1px solid ${theme.colors.gray[200]};
  border-bottom: 1px solid ${theme.colors.gray[200]};
  height: 64px;
  flex-shrink: 0;
`;

const Content = styled.div`
  border-bottom: 1px solid ${theme.colors.gray[200]};
  width: 100%;
  max-width: 1188px;
  flex-grow: 1;

  & input {
    height: 48px;
    width: 100%;
    font-size: 24px;
    font-weight: 600;
    border: none;
    border-bottom: 1px solid ${theme.colors.gray[200]};
    color: ${theme.colors.black};

    &::placeholder {
      color: ${theme.colors.gray[300]};
    }
  }

  & div:first-child {
    margin-bottom: 15px;
  }

  & div:last-child {
    position: relative;

    & p {
      position: absolute;
      bottom: 0px;
    }
  }

  & textarea {
    width: 100%;
    resize: none;
    border: none;
    font-size: 16px;
    color: ${theme.colors.black};

    &::placeholder {
      color: ${theme.colors.gray[300]};
    }

    &:focus {
      outline: none;
    }
  }

  & p {
    font-size: 14px;
    color: ${theme.colors.red};
  }
`;

const ImageContainer = styled.ul`
  display: flex;
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
  background-color: ${theme.colors.orange[100]};
`;

const ImageAdder = styled.label`
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

  & .error {
    border: 1px solid ${theme.colors.red};
    border-radius: 10px;
  }

  & p {
    font-size: 16px;
    color: ${theme.colors.orange[600]};
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

const SubmitBtn = styled.input`
  width: 350px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 10px;
  margin: 0 auto;
  background-color: ${theme.colors.orange[600]};
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
