import PageWrapper from '../../../common/PageWrapper';
import TimeDisplay from '../../../common/TimeDisplay';

interface Props {
  /** Time left on game timer */
  timer: number;
}

const Preparation = ({ timer }: Props) => {
  return (
    <PageWrapper>
      <TimeDisplay value={timer} />
      <h2>Get Ready!</h2>
    </PageWrapper>
  );
};

export default Preparation;
