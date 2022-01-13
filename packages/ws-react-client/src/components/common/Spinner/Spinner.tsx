import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerIcon = styled.div`
  border: 16px solid #f3f3f3;
  border-top: 16px solid #000;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${spin} 1.5s linear infinite;
`;

const Spinner = () => {
  return <SpinnerIcon />;
};

export default Spinner;
