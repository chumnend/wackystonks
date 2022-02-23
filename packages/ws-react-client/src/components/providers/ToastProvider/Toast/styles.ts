import styled from 'styled-components';

import { color, device } from '../../../../helpers/themes';

export const Container = styled.div`
  width: 80%;
  margin: 8px auto;
  background: ${color.white};
  border-radius: 5px;
  @media all and (min-width: ${device.md}) {
    width: 400px;
    margin: 8px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  padding-top: 5px;
  padding-right: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  @media all and (min-width: ${device.md}) {
    font-size: 1.5rem;
  }
`;

export const Message = styled.p`
  text-align: center;
  padding: 0.6rem;
  font-size: 1.2rem;
  @media all and (min-width: ${device.md}) {
    padding: 1rem;
    font-size: 1.5rem;
  }
`;
