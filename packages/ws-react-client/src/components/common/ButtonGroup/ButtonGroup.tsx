import React from 'react';

import { Div } from './styles';

interface Props {
  children: React.ReactNode;
  direction: 'row' | 'column';
}

const ButtonGroup = ({ children, direction = 'row' }: Props) => {
  return <Div direction={direction}>{children}</Div>;
};

export default ButtonGroup;
