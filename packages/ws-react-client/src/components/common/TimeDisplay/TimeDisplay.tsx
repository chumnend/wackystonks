import { Circle, Number } from './styles';

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
