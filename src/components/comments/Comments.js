import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { __getCommnetsByTodoId } from "../../redux/modules/commentsSlice";
import Comment from "./Comment";


const Comments = ({id}) => {

 const dispatch = useDispatch();
 useEffect(() => {
  dispatch(__getCommnetsByTodoId(id));
}, [dispatch, id]);


  const { data } = useSelector((state) => state.comments.commentsByTodoId);
 console.log(data)  
//  useEffect(() => {
//   data
//    return() => {
//    data
//  },[data])
 
  return (
    <div>
    
        <div>
          {data?.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
  
 </div>
     
  );
};

export default Comments;
