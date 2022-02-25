import React from 'react';

import { Div } from './styles';

interface Props {
  children: React.ReactNode;
}

const CardContainer = ({ children }: Props) => {
  return <Div>{children}</Div>;
};

export default CardContainer;
