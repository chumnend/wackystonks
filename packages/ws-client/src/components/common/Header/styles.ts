import styled from 'styled-components';

export const Header = styled.header`
  width: 100%;
  display: flex;
  padding: 0 2rem;
`;

export const Side = styled.div`
  flex: 1;
`;

export const AuthNav = styled.nav`
  padding: 1rem 0;
  display: flex;
  gap: 1rem;

  a {
    display: inline-block;
    box-sizing: border-box;
    padding: 0 1.6rem;
    height: 2.75rem;
    line-height: 2.75rem;
    border: 1px solid #000;
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
    text-decoration: none;

    &:hover {
      transform: scale(1.1);
    }
  }
`;
