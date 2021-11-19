import React from 'react';
import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface Props {
  children: React.ReactNode;
  direction: 'horizontal' | 'vertical';
}

const ButtonGroup = ({ children, direction }: Props) => {
  let content;
  switch (direction) {
    case 'horizontal':
      content = <Row>{children}</Row>;
      break;
    case 'vertical':
      content = <Column>{children}</Column>;
      break;
    default:
      content = null;
  }

  return content;
};

export default ButtonGroup;
