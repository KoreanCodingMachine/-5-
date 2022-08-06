import React, { useEffect } from 'react';
import ListItem from './ListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAsyncData } from '../../redux/modules/postSlice';

const List = () => {
  useEffect(() => {
    dispatch(getAsyncData());
  }, []);

  const data = useSelector((state) => state.post.post); // 20
  const data2 = useSelector((state) => state.post); // {post: 20, loading: false, error: true}
  console.log(data2);

  const dispatch = useDispatch();
  console.log(data);

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
