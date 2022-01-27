import React from 'react';
import styled from 'styled-components';

const OuterDiv = styled.div`
  width: 100%;
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InnerDiv = styled.div`
  width: min(24em, 95vw);
  height: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

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
