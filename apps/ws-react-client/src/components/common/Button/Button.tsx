import { PrimaryButton, SecondaryButton } from './styles';

interface Props {
  variant: 'primary' | 'secondary';
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({ variant, text, onClick, disabled }: Props) => {
  let content;
  switch (variant) {
    case 'primary':
      content = (
        <PrimaryButton onClick={onClick} disabled={disabled}>
          {text}
        </PrimaryButton>
      );
      break;
    case 'secondary':
      content = (
        <SecondaryButton onClick={onClick} disabled={disabled}>
          {text}
        </SecondaryButton>
      );
      break;
    default:
      content = null;
  }

  return content;
};

export default Button;
