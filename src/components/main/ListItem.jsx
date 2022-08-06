import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function ListItem({ post, onDeleteHandler }) {
  return (
    <>
      <StyledContainer>
        <StyledContents>
          <StyledLink to={`/detail/${post.id}`}>
            <h3>{post.title}</h3>
            <p>{post.contents}</p>
          </StyledLink>
          <StyledItemButtons>
            {/*  onClick={() => onToggleHandler(todo.id) */}
            <button onClick={() => onDeleteHandler(post.id)}>삭제</button>
            <Link to={`/update/${post.id}`}>
              <button>수정</button>
            </Link>
          </StyledItemButtons>
        </StyledContents>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  width: 60%;
  border: 1px solid #017573;
  margin: 10px;
  border-radius: 10px;
`;

const StyledContents = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  padding: 10px;
`;

const StyledTitle = styled.h3``;

const StyledItemButtons = styled.div`
  button {
    background-color: white;
    padding: 10px;
    margin: 5px;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid #256449;
    width: 50px;
  }
  button:nth-child(1) {
    background-color: white;
    border: 1px solid #e02b27;
  }
  button:nth-child(1):hover {
    background-color: #e02b27;
    border: 1px solid white;
    color: white;
  }
  button:nth-child(2):hover {
    background-color: #017573;
    padding: 10px;
    margin: 5px;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid white;
    color: white;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default ListItem;
