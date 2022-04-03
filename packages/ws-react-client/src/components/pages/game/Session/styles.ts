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
      'g g s s'
      'g g s s'
      'g g s s'
      'g g s s'
      'g g s s';
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
`;
