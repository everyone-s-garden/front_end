import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import { useForm, SubmitHandler, FormProvider, Controller } from 'react-hook-form';
import { useCreatePost } from 'api/CommunityAPI';
import { EditorState } from 'draft-js';
import { Post } from './types';
import PostToolBar from './ToolBar/PostToolBar';
import PostEditor from './PostEditor';
import ImageAdder from './ImageAdder';
import { useNavigate } from 'react-router-dom';

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
  const images = methods.watch('images');

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

    if (!imageFiles.length) {
      methods.setError('images', { type: 'required', message: '이미지를 1개 이상 업로드해주세요.' });
      return;
    }
    const formData = new FormData();
    const contentStr = JSON.stringify(content);
    /** 속닥속닥 게시글 blob */
    const jsonBlob = new Blob([JSON.stringify({ title, content: contentStr, postType: 'INFORMATION_SHARE' })], {
      type: 'application/json',
    });

    imageFiles.forEach(({ file }) => {
      formData.append('images', file);
    });
    formData.append('texts', jsonBlob);

    createPost(formData, {
      onSuccess(data) {
        console.log(data);
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
                <PostToolBar value={value} />

                <Content>
                  <PostEditor value={value} onChange={onChange} />
                </Content>
              </>
            )}
            name="content"
            control={methods.control}
          />

          <ImageAdder imageFiles={imageFiles} setImageFiles={setImageFiles} />

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
  padding: 0 20px;

  & .disabled {
    background-color: ${({ theme }) => theme.colors.orange[200]};
    cursor: default;
  }
`;

const Content = styled.div`
  max-width: 1188px;
  width: 100%;
  flex-grow: 1;
  font-size: 16px;
  margin: 0 auto;
  margin-top: 48px;
  display: flex;
  flex-direction: column;

  & h1 {
    font-size: 20px;
  }
  & h2 {
    font-size: 18px;
  }
  & h3 {
    font-size: 14px;
  }
  & .align-left div {
    text-align: left;
  }
  & .align-center div {
    text-align: center;
  }
  & .align-right div {
    text-align: right;
  }
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const SubmitBtn = styled.input`
  width: 350px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 10px;
  margin: 0 auto;
  margin-top: 100px;
  background-color: ${({ theme }) => theme.colors.orange[600]};
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;
