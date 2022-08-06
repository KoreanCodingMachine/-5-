import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Button from "../components/common/Button";
import { useMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { __addPost, __updatePost } from "../redux/modules/postSlice";
import axios from "axios";

function Detail() {
  // useMatch로 해당 주소가 맞는지 검사한다.
  const match = useMatch("/detail/:id");
  // 옵셔널 체이닝으로 id가 존재하면 post_id 저장
  const post_id = match?.params.id;

  const dispatch = useDispatch();
  const inputRef = useRef(null); //input에 focus 주기

  // 초기값
  const initialState = {
    id: 0,
    title: "",
    contents: "",
    writer: "",
  };

  const [post, setPost] = useState(initialState);

  // 초기렌더링 시 input에 focus 주기
  // 비동기통신으로 id에 해당하는 post 정보 가져오기
  useEffect(() => {
    inputRef.current.focus();
    if (post_id) {
      const { detailPost } = axios
        .get(`http://localhost:5001/list?id=${post_id}`)
        .then((response) => setPost(response.data[0]));
    }
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setPost({ ...post, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(__addPost({ ...post }));
    setPost(initialState); //input값 초기값으로 다시 세팅
    inputRef.current.focus(); // 등록될 때마다 input에 focus 주기
  };

  const onUpdateHandler = (e) => {
    e.preventDefault();
    if (post) {
      dispatch(
        __updatePost({
          id: post_id,
          writer: post.writer,
          title: post.title,
          contents: post.contents,
        })
      );
    }
  };

  // useEffect(
  //   (post_id) => {
  //     if (post_id) dispatch(__getPostId(post_id));
  //   },
  //   [dispatch, post_id]
  // );

  return (
    <>
      <StyledForm onSubmit={post_id ? onUpdateHandler : onSubmitHandler}>
        {post_id ? "게시글 ID : " + post_id : ""}
        <StyledInputBox>
          <StyledLabel>작성자</StyledLabel>
          <StyledInput
            name="writer"
            onChange={onChangeHandler}
            ref={inputRef}
            value={post.writer}
            required
          />
        </StyledInputBox>
        <StyledInputBox>
          <StyledLabel>제목</StyledLabel>
          <StyledInput
            name="title"
            onChange={onChangeHandler}
            value={post.title}
            required
          />
        </StyledInputBox>
        <StyledInputBox>
          <StyledLabel>내용</StyledLabel>
          <StyledInput
            name="contents"
            onChange={onChangeHandler}
            value={post.contents}
            required
          />
        </StyledInputBox>
        <Button>글 등록</Button>
        <Link to="/">
          <Button>이전</Button>
        </Link>
      </StyledForm>
    </>
  );
}

const StyledForm = styled.form`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 50vw;
  margin: 10px;
  height: 40px;
  border-radius: 10px;
  padding: 10px;
`;

const StyledLabel = styled.label`
  font-size: 15px;
`;

const StyledInputBox = styled.div``;

export default Detail;
