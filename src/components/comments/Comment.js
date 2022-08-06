import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from "react-redux";
import axios from 'axios';


import {
  __deleteComment,
  __updateComment,
} from "../../redux/modules/commentsSlice";
import {deleteComment, updateComment} from "../../redux/modules/commentsSlice";
const Comment = ({ comment})=> {
  const { id } = useParams();
  const dispatch = useDispatch();
  const commentEdit =useRef();  
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState(""); 
  const { content } = useSelector((state) => state.comment.data);
   console.log(content)
  // const onClickDeleteButtonHandler = (commentId) => {
  //   axios.delete(`http://localhost:5001/comment_list/${commentId}`);
  //   window.location.reload();
  // };
  // const onClickEditButtonHandler = (b) => {
  //   const editTodo ={
  //       content: b.content,
  //       isUpdate: !b.isUpdate
  //   };
  //   axios.patch(`http://localhost:5001/comment_list/${b.id}`, editTodo);
  //   window.location.reload();
  // };

  // const onClickSaveButtonHandler = (c) => {
  //   const editTodo ={
  //       content: c.content,
  //       isUpdate: !c.isUpdate
  //   };
  //   axios.patch(`http://localhost:5001/comment_list/${c.id}`, editTodo);
  //   window.location.reload();
  // };


  const onDeleteButtonHandler = () => {
    const result = window.confirm("삭제하시겠습니까?");
    if (result) {
      dispatch(__deleteComment(comment.id));
    } else {
      return;
    }
  };

  const onUpdateButtonHandler = () => {
    dispatch(
      __updateComment({
        id: comment.id,
        content: updatedComment,
        username: comment.username,
        todo_id: id,
      })
    );
    setIsEdit(false);
   
  };


  const onChangeEditButtonHandler = () => {
    setIsEdit(true);
    // dispatch(__getComment(comment.id));
    // dispatch(globalEditModeToggle(true));
  };

  const onCancelButtonHandler = () => {
    setIsEdit(false);
    // dispatch(clearComment());
    // dispatch(globalEditModeToggle(false));
  };

  useEffect(() => {
    setUpdatedComment(content);
  }, [content]);


  
return (
    // <div style={{
    //     display:"flex",
    //     border: "solid 1px"
    //     }}>
    //   <div>
    //     <div>{comment.username}</div>
    //     <h3>{comment.isUpdate ? <input ref={commentEdit}/> :comment.content}</h3>
    //   </div>
       
      
    //   <div>
        
    //     <button

    //     onClick={()=>onClickSaveButtonHandler({
    //             id:comment.id,
    //             content:comment.content,
    //             isUpdate:comment.isUpdate})}
    //     //   onClick={() => {
    //     //   dispatch(updateComment({
    //     //     id:comment.id,
    //     //     content:comment.content,
    //     //     isUpdate:comment.isUpdate}));
    //     // }}
    //     >
    //     {comment.isUpdate ? "취소" : "수정"}
    //     </button>
    //     <button
    //     onClick={() => (comment.isUpdate) ? 
    //         onClickEditButtonHandler({
    //                     id:comment.id,
    //                     content: commentEdit.current.value,
    //                     isUpdate:comment.isUpdate })
    //     : onClickDeleteButtonHandler(comment.id)
    // }
        
    //     //   onClick={() => {
    //     //     (comment.isUpdate) ? 
    //     //     dispatch(updateComment({
    //     //         id:comment.id,
    //     //         content: commentEdit.current.value,
    //     //         isUpdate:comment.isUpdate }))
    //     //     : dispatch(deleteComment(comment.id));
    //     // }}
    //     >
    //        {comment.isUpdate ? "저장" : "삭제"}
    //     </button>
       
    //   </div>
    // </div>


      <div>
      {isEdit ? (
        <>
          <div>
            <input
              type="text"
              value={updatedComment}
              onChange={(event) => {
                setUpdatedComment(event.target.value);
              }}
            />
          </div>
          <div>
            <button
              size="small"
              bgColor="#FE531F"
              onClick={onCancelButtonHandler}
            >
              <p>취소</p>
            </button>
            <button
              size="small"
              bgColor="#FE531F"
              onClick={onUpdateButtonHandler}
            >
              <p >저장</p>
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>{comment.username}</p>
            <p size="16">{comment.content}</p>
          </div>

          <div>
            <button
              size="small"
              bgColor="#FE531F"
              // disabled={isGlobalEditmode}
              onClick={onChangeEditButtonHandler}
            >
              수정
            </button>
            <button
              size="small"
              bgColor="#FE531F"
              onClick={onDeleteButtonHandler}
              // disabled={isGlobalEditmode}
            >삭제
            </button>
          </div>
        </>
      )}
    </div>

   
  );
}

export default Comment;



