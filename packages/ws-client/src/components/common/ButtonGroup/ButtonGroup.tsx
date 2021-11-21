import React from 'react';
import styled from 'styled-components';

interface DivProps {
  readonly direction: string;
}

const Div = styled.div<DivProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 0.5rem;
`;

interface Props {
  children: React.ReactNode;
  direction: 'row' | 'column';
}

const ButtonGroup = ({ children, direction = 'row' }: Props) => {
  return <Div direction={direction}>{children}</Div>;
};

export default ButtonGroup;
