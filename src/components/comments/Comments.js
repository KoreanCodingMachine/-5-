import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { __getCommnetsByTodoId } from "../../redux/modules/commentsSlice";
import { Text } from "../../elem";
import { flex } from "../../lib";
import Comment from "./Comment";
import AddCommentForm from "./AddCommentForm";

const Comments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.comments.commentsByTodoId);

  useEffect(() => {
      dispatch(__getCommnetsByTodoId(id));
  }, [dispatch, id]);

  return (
 <div>

      <AddCommentForm />
      <div>
        {data?.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
   
 </div>
     
  );
};

export default Comments;
