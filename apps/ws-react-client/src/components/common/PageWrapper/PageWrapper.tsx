import React from 'react';

import { OuterDiv, InnerDiv } from './styles';

interface Props {
  children: React.ReactNode;
}

const PageWrapper = ({ children }: Props) => {
  return (
    <OuterDiv>
      <InnerDiv>{children}</InnerDiv>
    </OuterDiv>
  );
};

export default PageWrapper;
