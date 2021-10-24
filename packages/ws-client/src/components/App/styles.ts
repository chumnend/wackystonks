import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body, #root {
        margin: 0;
        padding: 0;
        position: relative;
        height: 100%;
        font-size: 1rem;
        background-color: #fff;
        color: #000;
    }
`;
