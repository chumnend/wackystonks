import styled from 'styled-components';

export const Footer = styled.footer`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 1em;
`;

export const Tag = styled.div`
  text-align: center;
  font-size: 0.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.67rem 0;

  a {
    color: #0070f3;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Side = styled.div`
  flex: 1;
  margin-left: auto;
  position: relative;
`;
