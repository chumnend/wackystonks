import React from 'react';
import { CSSProperties } from 'styled-components';

import { Div } from './styles';

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
