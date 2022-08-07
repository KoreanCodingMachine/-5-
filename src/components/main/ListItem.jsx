import React from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { useDispatch } from 'react-redux';
import { deleteAsyncData } from '../../redux/modules/postSlice';
import { Link, useNavigate } from 'react-router-dom';

const ListItem = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <Button
          onClick={() => {
            dispatch(deleteAsyncData(item.id));
          }}
        >
          삭제
        </Button>
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
