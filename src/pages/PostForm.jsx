import React, { useState, useEffect } from 'react';
import Button from '../components/common/Button';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { postAsyncData } from '../redux/modules/postSlice';
import { useDispatch } from 'react-redux';

const Form = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');

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

  return (
    <form>
      <div>
        <label htmlFor='writer'>
          작성자:
          <input type='text' value={writer} onChange={onChangeWriter} />
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
          dispatch(postAsyncData({ title, content, writer }));
          navigate('/');
        }}
      >
        수정완료
      </Button>
    </form>
  );
};

export default Form;
