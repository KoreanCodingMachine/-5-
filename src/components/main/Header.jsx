import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/styles/palette';
import Button from '../common/Button';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Wrapper>
      <a href='#default' className='logo'>
        모두의 게시판
      </a>
      <Link to={`/write`}>
        <Button cyan>글 작성하기</Button>
      </Link>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: lightgray;
  padding: 8px 12px;
  position: relative;
  line-height: 3rem;
  a {
    text-decoration: none;
    color: ${palette.gray[8]};
  }
  font-weight: bold;

  @media screen and (max-width: 600px) {
    flex-direction: column;
    BUTTON {
      margin-top: 1rem;
    }
  }
`;
