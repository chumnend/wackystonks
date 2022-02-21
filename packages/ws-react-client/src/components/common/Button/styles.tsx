import styled from 'styled-components';

export const BaseButton = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0 1.6rem;
  height: 2.75rem;
  line-height: 2.75rem;
  border-radius: 5px;
  font-weight: 400;
  font-size: 1rem;
  outline: none;
  text-transform: capitalize;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.12);
  transition: transform 200ms;

  &:hover {
    transform: scale(1.1);
  }

  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  color: #000;
`;

export const SecondaryButton = styled(BaseButton)`
  border: 1px solid #eaeaea;
  color: #666;
`;
