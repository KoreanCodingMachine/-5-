import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAsyncData } from '../../redux/modules/postSlice';
import { Link, useNavigate } from 'react-router-dom';
import { __deleteCommentByTodoId } from '../../redux/modules/commentsSlice';

const ListItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialState = {
    todoId: 1,
    username: '',
    content: '',
    id: 1,
  };

  const { data } = useSelector((state) => state.comments.commentsByTodoId);
  console.log(data);

  const handleDelete = () => {
    dispatch(__deleteCommentByTodoId(item.id));
    dispatch(deleteAsyncData(item.id));
  };
  return (
    <Wrapper>
      <section className='title' onClick={() => navigate('/detail/' + item.id)}>
        <h2>{item.title}</h2>
        <p>{item.content}</p>
      </section>
      <section>
        <Link to={`/changeform/${item.id}`} state={{ item: item }}>
          <Button
          // onClick={() => {
          //   navigate(`/detail/${item.id}`);
          // }}
          >
            수정
          </Button>
        </Link>
        <Button onClick={handleDelete}>삭제</Button>
      </section>
    </Wrapper>
  );
};

export default ListItem;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid gray;
  margin: 0 auto;
  padding: 10px 20px;
  margin-top: 1rem;
  width: 500px;
  .title {
    display: block;
  }
`;
