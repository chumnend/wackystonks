import styled from 'styled-components';

const handleToastPosition = (position: string): string => {
  switch (position) {
    case 'topleft':
      return `top: 12px; left: 12px; transition 0.6s ease-in-out;`;
    case 'bottomright':
      return `bottom: 12px; right: 12px; transition 0.6s ease-in-out;`;
    case 'bottomleft':
      return `bottom: 12px; left: 12px; transition 0.6s ease-in-out;`;
    default:
      // topright
      return `top: 12px; right: 12px; transition 0.6s ease-in-out;`;
  }
};

interface ContainerProps {
  position: string;
}

export const Container = styled.div`
  position: fixed;
  box-sizing: border-box;
  z-index: 9999;
  ${(props: ContainerProps) => handleToastPosition(props.position)}
`;
