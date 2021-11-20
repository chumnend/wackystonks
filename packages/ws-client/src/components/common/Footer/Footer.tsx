import styled from 'styled-components';

const Container = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1em;
  position: absolute;
  bottom: 0;
`;

const Section = styled.div`
  flex: 1 1 auto;
  margin-left: auto;
  position: relative;
`;

const Main = styled.div`
  text-align: center;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.67rem 0;
`;

const Link = styled.a`
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

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
