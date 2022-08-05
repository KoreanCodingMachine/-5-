import React, { useRef } from "react";
import styled from "styled-components";
import { useDispatch} from "react-redux";
import axios from 'axios';

import {deleteComment, updateComment} from "../redux/modules/comments";
const Comment = ({ comment})=> {
  const dispatch = useDispatch();
  const commentEdit =useRef();
   
  const onClickDeleteButtonHandler = (commentId) => {
    axios.delete(`http://localhost:5001/comment_list/${commentId}`);
    window.location.reload();
  };
  const onClickEditButtonHandler = (b) => {
    const editTodo ={
        content: b.content,
        isUpdate: !b.isUpdate
    };
    axios.patch(`http://localhost:5001/comment_list/${b.id}`, editTodo);
    window.location.reload();
  };

  const onClickSaveButtonHandler = (c) => {
    const editTodo ={
        content: c.content,
        isUpdate: !c.isUpdate
    };
    axios.patch(`http://localhost:5001/comment_list/${c.id}`, editTodo);
    window.location.reload();
  };

  
return (
    <div style={{
        display:"flex",
        border: "solid 1px"
        }}>
      <div>
        <div>{comment.username}</div>
        <h3>{comment.isUpdate ? <input ref={commentEdit}/> :comment.content}</h3>
      </div>
       
      
      <div>
        
        <button

        onClick={()=>onClickSaveButtonHandler({
                id:comment.id,
                content:comment.content,
                isUpdate:comment.isUpdate})}
        //   onClick={() => {
        //   dispatch(updateComment({
        //     id:comment.id,
        //     content:comment.content,
        //     isUpdate:comment.isUpdate}));
        // }}
        >
        {comment.isUpdate ? "취소" : "수정"}
        </button>
        <button
        onClick={() => (comment.isUpdate) ? 
            onClickEditButtonHandler({
                        id:comment.id,
                        content: commentEdit.current.value,
                        isUpdate:comment.isUpdate })
        : onClickDeleteButtonHandler(comment.id)
    }
        
        //   onClick={() => {
        //     (comment.isUpdate) ? 
        //     dispatch(updateComment({
        //         id:comment.id,
        //         content: commentEdit.current.value,
        //         isUpdate:comment.isUpdate }))
        //     : dispatch(deleteComment(comment.id));
        // }}
        >
           {comment.isUpdate ? "저장" : "삭제"}
        </button>
       
      </div>
    </div>
  );
}

export default Comment;
