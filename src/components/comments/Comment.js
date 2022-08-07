import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from '../common/Button';
import {
  __deleteComment,
  __updateComment,
} from "../../redux/modules/commentsSlice";
import {
  clearComment,
  __getComment,
} from "../../redux/modules/commentSlice";

const Comment = ({ comment }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [updatedComment, setUpdatedComment] = useState("");
  const { content } = useSelector((state) => state.comment.data);


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
    dispatch(__getComment(comment.id));
  };

  const onCancelButtonHandler = () => {
    setIsEdit(false);
    dispatch(clearComment());
  };

  useEffect(() => {
    setUpdatedComment(content);
  }, [content]);


  return (
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
            <Button
              onClick={onCancelButtonHandler}
            >
              <p>취소</p>
            </Button>
            <Button
              onClick={onUpdateButtonHandler}
            >
              <p >저장</p>
            </Button>
          </div>
        </>
      ) : (
        <>
          <div>
            <p>{comment.username}</p>
            <p>{comment.content}</p>
          </div>
          <div>
            <Button
              onClick={onChangeEditButtonHandler}
            >
              수정
            </Button>
            <Button
              onClick={onDeleteButtonHandler}
            >삭제
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Comment;



