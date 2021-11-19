import * as Styled from './styles';

const Footer = () => {
  return (
    <Styled.Footer>
      <Styled.Side />
      <Styled.Tag>
        <span>
          WackyStonks by{' '}
          <a href="#" target="_blank" rel="noopener noreferrer">
            Nicholas Chumney
          </a>
        </span>
        <a href="#">View on GitHub</a>
      </Styled.Tag>
      <Styled.Side />
    </Styled.Footer>
  );
};

export default Footer;
