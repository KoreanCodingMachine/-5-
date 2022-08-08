import React, { useState } from 'react';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { postAsyncData } from '../redux/modules/postSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm();

  const [data, setData] = useState({
    title: '',
    writer: '',
    content: '',
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = async (data) => {
    await new Promise((r) => setTimeout(r, 100));
    alert(JSON.stringify(data));
    dispatch(postAsyncData(data));
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <input
          aria-invalid={!isDirty ? undefined : errors.email ? 'true' : 'false'}
          {...register('writer', {
            required: '작성자는 필수 입력입니다.',
            minLength: {
              value: 5,
              message: '5자리 이상 작성자를 입력하세요',
            },
          })}
          type='text'
          value={data.writer}
          onChange={onChange}
          placeholder='작성자'
        />
        {errors.writer && <p>{errors.writer.message}</p>}
        <input
          aria-invalid={!isDirty ? undefined : errors.email ? 'true' : 'false'}
          {...register('title', {
            required: '제목은 필수 입력입니다.',
            minLength: {
              value: 5,
              message: '5자리 이상 제목을 입력해주세요',
            },
          })}
          type='text'
          value={data.title}
          onChange={onChange}
          placeholder='title'
        />
        {errors.title && <p>{errors.title.message}</p>}
        <input
          aria-invalid={!isDirty ? undefined : errors.email ? 'true' : 'false'}
          {...register('content', {
            required: '내용은 필수 입력입니다.',
            maxLength: {
              value: 20,
              message: '내용 제한은 20자 이하입니다.',
            },
          })}
          type='text'
          value={data.content}
          onChange={onChange}
          placeholder='content'
        />
        {errors.content && <p>{errors.content.message}</p>}
        <Button
          type='submit'
          disabled={isSubmitting}
          // onClick={() => {
          //   // dispatch(postAsyncData(data));
          //   // navigate('/');
          // }}
        >
          작성완료
        </Button>
      </Wrapper>
    </form>
  );
};

export default Form;

const Wrapper = styled.div`
  margin-top: 10rem;
  input {
    padding: 20px;
    display: block;
    margin: 0 auto;
    width: 500px;
    margin-bottom: 30px;
    border: 1px solid gray;
    border-radius: 5px;
  }
  Button {
    display: block;
    margin: 0 auto;
    margin-top: 10px;
    width: 500px;
  }
`;
