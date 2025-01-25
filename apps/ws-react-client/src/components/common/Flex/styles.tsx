import styled from 'styled-components';

interface DivProps {
  readonly direction: string;
  readonly justifyContent: string;
  readonly alignItems: string;
  readonly gap: string;
  readonly width: string;
  readonly height: string;
}

export const Div = styled.div<DivProps>`
  display: flex;
  width: ${(props) => props.width};
  height ${(props) => props.height};
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  gap: ${(props) => props.gap};
`;
