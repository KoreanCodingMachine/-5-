import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import axios from 'axios';
import {useParams, useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";


import Comment from "../components/Comment";
import { __addComment,__getCommnetsByTodoId } from "../redux/modules/comments";

const Detail = ()=>{
    const todo={
        id:3,
        name:"경문",
        title: "과학",
        content: "상대성이론"
    }
    const { id } = useParams();
    const dispatch = useDispatch();

    const { data } = useSelector((state) => state.comments.commentsByTodoId);
    const navigate =useNavigate(); 

    // const allComment_list = useSelector((state)=>state.list);
    // console.log(allComment_list)
    // const comment_list = allComment_list.filter(cur => cur.todo_id===todo.id)
    // const comment_name_ref = useRef(null);
    // const comment_content_ref = useRef(null);
    // const todo = todo_list.find(cur=>cur.id === Number(params.id))
    
    

    // const onSubmitHandler = (event) => {
    //     event.preventDefault();
    //     const comment_data ={
    //     name : comment_name_ref.current.value, 
    //     content: comment_content_ref.current.value, 
    //     todo_id: todo.id
    //   };
    //     // dispatch(createComment(comment_data));
    //     axios.post("http://localhost:5001/comment_list", comment_data);
    //     comment_name_ref.current.value="";
    //     comment_content_ref.current.value="";
    //     window.location.reload();
    //   };

    //   const getCommentList = async () => {
    //   const res = await axios.get(
    //     `http://localhost:5001/comment_list`);
    //     dispatch(setCommentList(res.data));
    // }
  
    // useEffect(() => {
    //     getCommentList();
    // }, []);

    useEffect(() => {

          dispatch(__getCommnetsByTodoId(id));
      }, [dispatch, id]);
   

    const [comment, setComment] = useState({
        username: "",
        content: "",
      });


      const addCommentButtonHandler = (event) => {
        event.preventDefault();
        if (comment.content.trim() === "" || comment.username.trim() === "") {
          return alert("모든 항목을 입력해주세요.");
        }
        dispatch(__addComment({ todoId: id, ...comment }));
        setComment({
          username: "",
          content: "",
        });
      };

      const onChangeInputHandler = (event) => {
        const { name, value } = event.target;
        setComment({
          ...comment,
          [name]: value,
        });
      };



    return(
        <div>
            <button onClick={() => {
                navigate("/");
            }}>
                홈으로
            </button>
            <div>게시글id : {todo.id}</div>
            <div>작성자 : {todo.name}</div>
            <h2>제목 : {todo.title}</h2>
            <div>내용 : {todo.content}</div>

            <form onSubmit={addCommentButtonHandler}>
                <input 
                typu="text"
                value={comment.username}
                name="username"
                onChange={onChangeInputHandler}
                />
                <input 
                 value={comment.content}
                 name="content"
                 type="text"
                 onChange={onChangeInputHandler}
                />
                <button type="submit" onClick={addCommentButtonHandler}>추가</button>
            </form>
            
            {data?.map((comment) => {
          return (
               <Comment
               key={comment.id}
               comment={comment}
               />
          )          
        })}
            
        </div>

    )
}


export default Detail;