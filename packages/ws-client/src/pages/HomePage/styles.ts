import styled from 'styled-components';

export const HomePage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.main`
  width: min(24rem, 95vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const Banner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;

  h3 {
    position: absolute;
    top: 130px;
  }
`;

export const MainButtons = styled.div`
  display: flex;
  gap: 0.66rem;
`;

export const MainButton = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0 1.6rem;
  height: 2.75rem;
  line-height: 2.75rem;
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

  &:hover {
    transform: scale(1.1);
  }
`;

export const ExtraButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.33rem;
  padding: 1rem 0;
`;

export const ExtraButton = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0 1.5rem;
  height: 2.75rem;
  line-height: 2.75rem;
  border: 1px solid #eaeaea;
  border-radius: 5px;
  font-weight: 400;
  font-size: 1rem;
  outline: none;
  text-transform: capitalize;
  text-align: center;
  background-color: #fff;
  color: #666;
  cursor: pointer;
  box-shadow: 0 5px 10px rgb(0, 0, 0, 0.12);
  transition: transform 200ms;

  &:hover {
    transform: scale(1.1);
  }
`;

export const InstructionsHeader = styled.div`
  display: flex;
  justify-content: center;
`;

export const InstructionsList = styled.ul`
  margin: 0;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
`;
