import styled from 'styled-components';

export const Session = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
`;

export const Header = styled.div`
  width: 95%;
  height: auto;
  min-height: 50px;
  display: flex;
  margin: 1rem auto;
  padding: 0 2rem;
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
  height: auto;
`;

export const Players = styled.div`
  height: auto;
`;

export const PlayerCard = styled.div`
  width: 90%;
  margin: 0.5rem auto;
  padding: 1.5rem 1rem;
  border-radius: 5px;
  border: 1px solid #000;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
`;
