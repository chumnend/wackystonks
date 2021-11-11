import styled from 'styled-components';

export const Lobby = styled.div`
  width: min(24em, 95vw);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex: 1;
`;

export const Content = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const InviteLink = styled.span`
  &:hover {
    cursor: pointer;
  }
`;

export const PlayerContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background: #eaeaea;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
`;

export const PlayerCards = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.35rem;
  justify-content: center;
  align-items: center;
`;

export const PlayerCard = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid #eaeaea;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
`;

export const ChatContainer = styled.div`
  border-radius: 5px;
  border: 1px solid #eaeaea;
  background: #eaeaea;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.28);
  padding: 1rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  align-items: center;
`;

export const Button = styled.button`
  display: inline-block;
  box-sizing: border-box;
  padding: 0 1.6rem;
  min-width: 50%;
  height: 3rem;
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

  &:hover:not([disabled]) {
    transform: scale(1.1);
  }

  &:disabled {
    color: grey;
    cursor: not-allowed;
  }
`;
