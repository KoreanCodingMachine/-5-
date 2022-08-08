import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../components/comments/Comment';
import { __getCommnetsByTodoId } from '../redux/modules/commentsSlice';
import { getAsyncData } from '../redux/modules/postSlice';
import AddComment from '../components/comments/Addcomment';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  // state가 정의 안되있어서 undefined 에러가 났다.


  const todo_list = useSelector((state) => state.post.post);
  console.log(todo_list);

  const todo = todo_list.find((cur) => cur.id == id);
  console.log(todo);
  console.log(id);

  const { data } = useSelector((state) => state.comments.commentsByTodoId);
  console.log(data);

  const [post, setPost] = useState(initialState);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5001/post_data?id=${id}`)
        .then((response) => setPost(response.data[0]));
    }
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
      <div>게시글id : {post.id}</div>
      <div>작성자 : {post.writer}</div>
      <h2>제목 : {post.title}</h2>
      <div>내용 : {post.content}</div>


      <AddComment />
      <div>
        {data &&
          data.map((comment) => <Comment key={comment.id} comment={comment} />)}
      </div>
    </div>
  );
};

export default Detail;
