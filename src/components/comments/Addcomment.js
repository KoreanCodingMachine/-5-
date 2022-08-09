import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { __addComment } from '../../redux/modules/commentsSlice';
import Button from '../common/Button';
import { useForm } from "react-hook-form";

const AddComment = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { register, handleSubmit,  formState: { isDirty, errors } } = useForm();


  const [comment, setComment] = useState({
    username: '',
    content: '',
  }); 

  const onAddCommentButtonHandler =  (data) => {
      console.log(data);
  
    dispatch(__addComment({ 
      todoId: Number(id), 
      username: data.username, 
      content: data.content }));
    setComment({
      username: '',
      content: '',
    });
  };

  const onChangeInputHandler = (event) => {
    const { name, value } = event.target;
    setComment({
      ...comment,
      [name]: value,
    });
  };

  return (
    <div>
    <form onSubmit={handleSubmit(onAddCommentButtonHandler )}>
      <div>
        <input
          placeholder="작성자이름 (5자 이내)" 
          aria-invalid={!isDirty ? undefined : errors.username ? "true" : "false"}
          {...register("username", {
            required: "작성자는 필수 입력사항입니다.",
            maxLength: {
              value: 5,
              message: "5자 이내로  작성해주세요.",
            },
          })}
          value={comment.username}
          type='text'
          name='username'
          onChange={onChangeInputHandler}
        />
      {errors.username && <small role="alert">{errors.username.message}</small>}
      </div>
      <input
        placeholder='댓글내용 (100자 이내)'
        aria-invalid={!isDirty ? undefined : errors.content ? "true" : "false"}
        {...register("content", {
          required: "내용은 필수 입력사항입니다.",
          maxLength: {
            value: 100,
            message: "100자 이내로  작성해주세요.",
          },
        })}
        value={comment.content}
        name='content'
        type='text'
        onChange={onChangeInputHandler}
      />
       {errors.content && <small role="alert">{errors.content.message}</small>}
      <Button type='submit'>
        추가하기
      </Button>
    </form>

    </div>
  );
};

export default AddComment;
