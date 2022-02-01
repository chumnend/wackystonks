import styled from 'styled-components';

const Circle = styled.div`
  height: 80px;
  width: 80px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  border-radius: 100%;
  background: lightgrey;
`;

const Number = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

interface Props {
  /** The amount of time left */
  value: number;
}

const TimeDisplay = ({ value }: Props) => {
  return (
    <Circle>
      <Number>{value}</Number>
    </Circle>
  );
};

export default TimeDisplay;
