import PageWrapper from '../../../common/PageWrapper';
import TimeDisplay from '../../../common/TimeDisplay';

interface Props {
  /** Time left on game timer */
  timeLeft: number;
}

const Preparation = ({ timeLeft }: Props) => {
  return (
    <PageWrapper>
      <TimeDisplay value={timeLeft} />
      <h2>Get Ready!</h2>
    </PageWrapper>
  );
};

export default Preparation;
