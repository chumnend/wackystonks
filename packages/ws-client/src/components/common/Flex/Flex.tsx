import React from 'react';
import styled from 'styled-components';

interface DivProps {
  readonly direction: string;
  readonly justifyContent: string;
  readonly alignItems: string;
  readonly gap: string;
}

const Div = styled.div<DivProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  gap: ${(props) => props.gap};
`;

interface Props {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'flex-end' | 'center';
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  gap?: string;
}

const Flex = ({
  children,
  direction = 'row',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  gap = '0.5rem',
}: Props) => {
  return (
    <Div direction={direction} justifyContent={justifyContent} alignItems={alignItems} gap={gap}>
      {children}
    </Div>
  );
};

export default Flex;
