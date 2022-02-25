import { Container, Section, Main, Link } from './styles';

const Footer = () => {
  return (
    <Container>
      <Section />
      <Main>
        <span>
          WackyStonks by{' '}
          <Link href="#" target="_blank" rel="noopener noreferrer">
            Nicholas Chumney
          </Link>
        </span>
        <Link href="#">View on GitHub</Link>
      </Main>
      <Section />
    </Container>
  );
};

export default Footer;
