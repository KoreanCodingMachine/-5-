import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../components/comments/Comment';
import { __getCommnetsByTodoId } from '../redux/modules/commentsSlice';
import { getAsyncData } from '../redux/modules/postSlice';
import AddComment from '../components/comments/Addcomment';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const todo_list = useSelector((state) => state.post.post);
  console.log(todo_list);
  const todo = todo_list.find((cur) => cur.id == id);
  console.log(todo);

  useEffect(() => {
    dispatch(getAsyncData());
    dispatch(__getCommnetsByTodoId(id));
    return () => dispatch(__getCommnetsByTodoId('a'));
  }, []);

  const { data } = useSelector((state) => state.comments.commentsByTodoId);
  console.log(data);
  return (
    <div>
      <button
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로
      </button>
      <div>게시글id : {todo.id}</div>
      <div>작성자 : {todo.writer}</div>
      <h2>제목 : {todo.title}</h2>
      <div>내용 : {todo.content}</div>

      <AddComment />
      <div>
        {data.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Detail;
