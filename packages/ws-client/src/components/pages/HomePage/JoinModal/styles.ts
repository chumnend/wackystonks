import styled from 'styled-components';

export const JoinModal = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.h3`
  text-align: center;
`;

export const CodeInput = styled.input`
  width: 30%;
  height: 2.75rem;
  margin: 1.5rem auto;
  padding: 4px 10px;
  font-size: 1.2rem;
`;

export const JoinButton = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0 1.2rem;
  width: 30%;
  height: 2.75rem;
  margin: 0 auto;
  line-height: 2.75rem;
  border-radius: 5px;
  font-weight: 400;
  font-size: 1rem;
  outline: none;
  text-transform: capitalize;
  text-align: center;
  background-color: #fff;
  color: #000;
  cursor: pointer;
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.12);
  transition: transform 200ms;

  &:hover {
    transform: scale(1.1);
  }
`;
