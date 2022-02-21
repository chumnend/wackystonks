import { Div, Title } from './styles';

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
