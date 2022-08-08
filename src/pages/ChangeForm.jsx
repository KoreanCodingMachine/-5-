import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { putAsyncData, getAsyncData } from '../redux/modules/postSlice';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

const Detail = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const params = useParams();

  const onSubmit = (data) => console.log(data);

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    setId(params.id);
    dispatch(getAsyncData());
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeWriter = (e) => {
    setWriter(e.target.value);
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const loc = location.state.item.title;
  console.log(loc);

  useEffect(() => {
    setTitle(location.state.item.title);
    setWriter(location.state.item.writer);
    setContent(location.state.item.content);
  }, []);

  const data = location.state;
  console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor='writer'>
          작성자:
          <input
            {...register('writer', { required: '5글자 이내로 입력해주세요' })}
            type='text'
            value={writer}
            onChange={onChangeWriter}
          />
        </label>
        <label htmlFor='title'>
          제목:
          <input type='text' value={title} onChange={onChangeTitle} />
        </label>
        <label htmlFor='content'>
          내용:
          <input type='text' value={content} onChange={onChangeContent} />
        </label>
      </div>
      <Button
        onClick={() => {
          // dispatch(putAsyncData({ id, title, content, writer }));
          // navigate('/');
        }}
      >
        수정완료
      </Button>
    </form>
  );
};

export default Detail;
