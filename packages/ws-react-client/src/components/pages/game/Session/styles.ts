import styled from 'styled-components';

import { device } from '../../../../helpers/themes';

export const Layout = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 1rem;
  display: grid;
  position: relative;
  grid-template-areas:
    't t t t'
    'g g g g'
    'g g g g'
    'g g g g'
    's s s s'
    's s s s';

  @media all and (min-width: ${device.md}) {
    display: grid;
    position: relative;
    grid-template-areas:
      't t t t'
      'g g g s'
      'g g g s'
      'g g g s'
      'g g g s'
      'g g g s';
  }
`;

export const TimeArea = styled.div`
  grid-area: t;
`;

export const GameArea = styled.div`
  grid-area: g;
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
