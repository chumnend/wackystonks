import styled from 'styled-components';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Title = styled.h3`
  position: absolute;
  top: 130px;
`;

interface Props {
  src: string;
  alt: string;
  title: string;
}

const Banner = ({ src, alt, title }: Props) => {
  return (
    <Div>
      <img src={src} alt={alt} />
      <Title>{title}</Title>
    </Div>
  );
};

export default Banner;
