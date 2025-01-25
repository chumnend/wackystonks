import styled from 'styled-components';

interface DivProps {
  readonly direction: string;
}

export const Div = styled.div<DivProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 0.5rem;
`;
