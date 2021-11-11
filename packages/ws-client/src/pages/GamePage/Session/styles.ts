import styled from 'styled-components';

export const Session = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 95%;
  height: auto;
  min-height: 50px;
  display: flex;
  margin: 1rem auto;
  padding: 0 2rem;
  background: green;
`;

export const Content = styled.div`
  width: 95%;
  margin: 0 auto;
  flex: 1 1 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr;
  gap: 1rem;
`;

export const Stonks = styled.div`
  height: 100%;
  background: red;
`;

export const Players = styled.div`
  height: 100%;
  background: blue;
`;
