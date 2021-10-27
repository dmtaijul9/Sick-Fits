import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

    @font-@font-face {
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2');
        format('woff2');
        font-weight: normal;
        font-style: normal
    }
    html {
        --red: #ff0000;
        --black: #3f3f3f;
        --grey: #3a3a3a;
        --lightGrey: #e1e1e1;
        --offWhite: #ededed;
        --maxWidth: 1000px;
        --bs: '0 12px 0 rgba(0,0,0,0,09);';
        box-sizing: border-box;
        *, *:before, *:after {
            box-sizing: inherit;
        }
    }
    body {
        font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding: 0;
        margin: 0;
        font-size: 1.5rem;
        line-height: 2;
    }
    a {
        text-decoration: none ;
        color: var(---black);
    }
    a:hover {
        text-decoration: underline;
    }
    button {
        font-family: 'radnika_next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
`;

export default GlobalStyles;