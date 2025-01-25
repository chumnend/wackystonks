import styled from 'styled-components';

import { color } from '../../../../helpers/themes';

export const Container = styled.div`
  background: ${color.grey};
  margin: 8px auto;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  pointer-events: auto;
  width: 300px;
  max-height: 250px;
  box-shadow: 0 0 10px ${color.darkgrey};
  color: ${color.black};
  opacity: 0.9;

  &:hover {
    cursor: pointer;
    opacity: 1;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const CloseButton = styled.button`
  position: relative;
  right: 0.3em;
  top: 0.3em;
  float: right;
  font-weight: 700;
  color: ${color.black};
  outline: none;
  border: none;
  text-shadow: 0 1px 0 #fff;
  opacity: 0.8;
  line-height: 1;
  font-size: 1.2rem;
  padding: 0;
  cursor: pointer;
  background: 0 0;
  border: 0;
`;

export const Message = styled.p`
  text-align: center;
  padding: 0.6rem;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
