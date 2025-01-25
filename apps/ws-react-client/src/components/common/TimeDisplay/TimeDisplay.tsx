import * as Styled from './styles';

interface Props {
  /** The amount of time left */
  value: number;
}

const TimeDisplay = ({ value }: Props) => {
  return <Styled.Number>{value}</Styled.Number>;
};

export default TimeDisplay;
