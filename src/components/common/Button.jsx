import React from 'react';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const Button = (props) => {
  // source: https://yeun.github.io/open-color/
  return <StyledButton {...props} />;
};

export default Button;

const StyledButton = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: white;
  outline: none;
  cursor: pointer;
  margin-right: 10px;

  background: ${palette.gray[8]};
  &:hover {
    background: ${palette.gray[6]};
  }

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
`;
