import React from 'react';
import styled, { CSSProperties } from 'styled-components';

interface DivProps {
  readonly direction: string;
  readonly justifyContent: string;
  readonly alignItems: string;
  readonly gap: string;
  readonly width: string;
  readonly height: string;
}

const Div = styled.div<DivProps>`
  display: flex;
  width: ${(props) => props.width};
  height ${(props) => props.height};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  gap: ${(props) => props.gap};
`;

interface Props {
  children?: React.ReactNode;
  width?: string;
  height?: string;
  direction?: 'row' | 'column';
  justifyContent?: 'flex-start' | 'flex-end' | 'center';
  alignItems?: 'flex-start' | 'flex-end' | 'center';
  gap?: string;
  style?: CSSProperties | undefined;
}

const Flex = ({
  children,
  style,
  width = 'auto',
  height = 'auto',
  direction = 'row',
  justifyContent = 'flex-start',
  alignItems = 'flex-start',
  gap = '0.5rem',
}: Props) => {
  return (
    <Div
      style={style}
      width={width}
      height={height}
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      gap={gap}
    >
      {children}
    </Div>
  );
};

export default Flex;
