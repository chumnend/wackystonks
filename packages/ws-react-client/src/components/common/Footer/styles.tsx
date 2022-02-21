import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1em;
  position: absolute;
  bottom: 0;
`;

export const Section = styled.div`
  flex: 1 1 auto;
  margin-left: auto;
  position: relative;
`;

export const Main = styled.div`
  text-align: center;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.67rem 0;
`;

export const Link = styled.a`
  color: #0070f3;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
