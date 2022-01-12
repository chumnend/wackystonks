import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
  width: 100%;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background: #eaeaea;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
`;

interface Props {
  children: React.ReactNode;
}

const CardContainer = ({ children }: Props) => {
  return <Div>{children}</Div>;
};

export default CardContainer;
