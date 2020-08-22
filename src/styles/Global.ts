import { createGlobalStyle } from 'styled-components';

import GithubBackground from '../assets/github-background.svg';

const GlobalStyle = createGlobalStyle`

    *{
        margin:0;
        padding:0;
        outline:0;
        box-sizing:border-box;
    }

    li{
        list-style:none;
    }

    a{
        text-decoration:none;
        color:inherit;
    }

    body{
        background: #F0F0F5 url(${GithubBackground}) no-repeat 70% top;
        -webkit-font-smoothing:antialiased;
    }

    body, input, button{
        font-size:16px ;
        font-family:Roboto, sans-serif;
    }

    button{
        cursor:pointer;
    }

    #root{
        max-width:960px;
        margin:0 auto;
        padding:40px 20px;
    }

`;

export default GlobalStyle;
