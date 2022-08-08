import React, { useEffect, useState, useRef, useCallback } from 'react';
import ListItem from './ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAsyncData } from '../../redux/modules/postSlice';

const List = () => {
  useEffect(() => {
    dispatch(getAsyncData());
  }, []);

  const data = useSelector((state) => state.post.post); // 20

  const dispatch = useDispatch();

  return (
    <>
      {data &&
        data.map((item) => {
          return <ListItem key={item.id} item={item} />;
        })}
    </>
  );
};

export default List;
