import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { useCreatePost } from 'api/CommunityAPI';
import { EditorState, convertToRaw } from 'draft-js';
import { Post } from './types';
import PostToolBar from './ToolBar/PostToolBar';
import PostEditor from './PostEditor';
import ImageAdder from './ImageAdder';
import { useNavigate } from 'react-router-dom';
import MobileToolBar from './ToolBar/MobileToolBar';
import PostTypeSelector from './ToolBar/PostTypeSelector';
import { POST_TYPE } from './constants';
import convertToHtml from 'pages/Community/CommunityWrite/convertToHtml';

const CommunityWrite = () => {
  const [isActive, setIsActive] = useState(false);
  const [imageFiles, setImageFiles] = useState<
    {
      file: Blob;
      src: string;
    }[]
  >([]);

  const { mutate: createPost } = useCreatePost();
  const navigate = useNavigate();

  // TODO: 수정 페이지 구현 시 기존 게시글 정보를 불러와서 defaultValues로 설정
  const methods = useForm<Post>({
    defaultValues: {
      postType: '주제',
      title: '',
      content: EditorState.createEmpty(),
      images: [],
    },
  });

  const postType = methods.watch('postType');
  const title = methods.watch('title');
  const content = methods.watch('content');

  useEffect(() => {
    if (imageFiles.length) {
      methods.clearErrors('images');
    }
  }, [imageFiles, methods]);

  useEffect(() => {
    if (title && content.getCurrentContent().getPlainText()) {
      setIsActive(true);

      return;
    }

    setIsActive(false);
  }, [title, content]);

  const onSubmit: SubmitHandler<Post> = ({ content, title }) => {
    if (postType === '주제') {
      methods.setError('postType', { type: 'required', message: '게시글 타입을 선택해주세요.' });
      return;
    }

    const formData = new FormData();

    const rawContentState = convertToRaw(content.getCurrentContent());
    const markup = convertToHtml(rawContentState.blocks);

    /** 속닥속닥 게시글 blob */
    const jsonBlob = new Blob([JSON.stringify({ title, content: markup, postType: POST_TYPE[postType] })], {
      type: 'application/json',
    });

    imageFiles.forEach(({ file }) => {
      formData.append('images', file);
    });
    formData.append('texts', jsonBlob);

    createPost(formData, {
      onSuccess() {
        navigate('/community');
      },
    });
  };

  return (
    <Container>
      <Helmet>
        <title>속닥속닥 글쓰기 페이지</title>
      </Helmet>

      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          <Controller
            render={({ field: { value, onChange } }) => (
              <>
                <PostTypeSelector />
                <PostToolBar value={value} />

                <PostEditor value={value} onChange={onChange} />

                <ImageAdder imageFiles={imageFiles} setImageFiles={setImageFiles} />

                <MobileToolBar value={value} />
              </>
            )}
            name="content"
            control={methods.control}
          />

          <SubmitBtn type="submit" value="등록하기" disabled={!isActive} className={isActive ? '' : 'disabled'} />
        </Form>
      </FormProvider>
    </Container>
  );
};

export default CommunityWrite;

const Container = styled.div`
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
    background-color: ${({ theme }) => theme.colors.orange[200]};
    cursor: default;
  }

  @media (${({ theme }) => theme.devices.mobile}) {
    padding: 0 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SubmitBtn = styled.input`
  width: 100%;
  height: 60px;
  flex-shrink: 0;
  margin: 0 auto;
  margin-top: 100px;
  background-color: ${({ theme }) => theme.colors.orange[600]};
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  border-radius: 0;
  cursor: pointer;

  position: fixed;
  bottom: 0;

  @media (${({ theme }) => theme.devices.mobile}) {
    position: relative;
    width: 350px;
    height: 56px;
    border-radius: 10px;
  }
`;
