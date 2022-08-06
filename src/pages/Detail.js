import React, { useEffect } from "react";
import styled from "styled-components";
import {useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";

import { clearTodo } from "../redux/modules/todoSlice";
import { __getCommnetsByTodoId } from "../redux/modules/commentsSlice";
import AddComment from "../components/comments/AddComment";
import Comments from "../components/comments/Comments";

const Detail = ()=>{
    const { id } = useParams();
    const dispatch = useDispatch();
    const todo_list = useSelector((state)=>state.todos.data);
    const todo = todo_list.find(cur=>cur.id == id)
    const navigate =useNavigate(); 


    // useEffect(() => {
    //     return () => dispatch(clearTodo());
    //   }, [id]);

    useEffect(() => {
          dispatch(__getCommnetsByTodoId(id));
      }, [dispatch, id]);

    return(
        <div>
            <button onClick={() => {
                navigate("/");
            }}>
                홈으로
            </button>
            <div>게시글id : {todo.id}</div>
            <div>작성자 : {todo.writer}</div>
            <h2>제목 : {todo.title}</h2>
            <div>내용 : {todo.content}</div>


            <AddComment />
            <Comments id={id}/>
        </div>

    )
}


export default Detail;