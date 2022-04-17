import styled from 'styled-components';

import { device } from '../../../../helpers/themes';

export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  display: grid;
  position: relative;
  grid-template-rows: 100px auto auto auto;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas:
    't t t t'
    's s s s'
    'g g g g'
    'g g g g';

  @media all and (min-width: ${device.md}) {
    grid-template-areas:
      't t t t'
      'g g g s'
      'g g g s'
      'g g g s';
  }
`;

export const TimeArea = styled.div`
  grid-area: t;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const GameArea = styled.div`
  grid-area: g;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StonkCard = styled.div`
  width: 100%;
  height: 270px;
  background: #fff;
  border-radius: 10px;
  padding: 10px 1.5rem;
`;

export const StonkHeader = styled.div`
  height: 50px;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ScoreArea = styled.div`
  grid-area: s;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const PlayerCard = styled.div`
  width: 100%;
  max-height: 5rem;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background: #eaeaea;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
`;

export const CurrentPlayerCard = styled.div``;
