import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Comment from '../components/comments/Comment';
import { __getCommnetsByTodoId } from '../redux/modules/commentsSlice';
import { getAsyncData } from '../redux/modules/postSlice';
import AddComment from '../components/comments/Addcomment';
import axios from "axios";
import Pagination from '../components/comments/Pagination';

const Detail = () => {
  const initialState = {
    id: 0,
    title: "",
    content: "",
    writer: "",
  };
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [post, setPost] = useState(initialState);
  
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5001/post_data?id=${id}`)
        .then((response) => setPost(response.data[0]));
    }
    fetch(`http://localhost:5001/comment_list?todoId=${id}`)
    .then((res) => res.json())
    .then((data) => setComments(data));
    dispatch(__getCommnetsByTodoId(id));
    return () => dispatch(__getCommnetsByTodoId('a'));
  }, []);


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
      {comments.slice(offset, offset + limit).map(( comment) => (
         <Comment key={comment.id} comment={comment} />
        ))}
      
      </div>
      <footer>
        <Pagination
          total={comments.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </div>
  );
};

export default Detail;
