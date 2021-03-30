import { createGlobalStyle } from 'styled-components'
import reset from 'styled-reset-advanced'

import proximaNovaFont from '../assets/fonts/proxima-nova.woff'
import proximaNovaFontLight from '../assets/fonts/proxima-nova-light.woff'
import proximaNovaFontSemiBold from '../assets/fonts/proxima-nova-semibold.woff'
import proximaNovaFontExtraBold from '../assets/fonts/proxima-nova-extrabold.woff'
export const GlobalStyle = createGlobalStyle`
  ${reset}
  
  * {
    user-select: text;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url(${proximaNovaFont}) format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url(${proximaNovaFontLight}) format('woff');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url(${proximaNovaFontSemiBold}) format('woff');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Proxima Nova';
    src: url(${proximaNovaFontExtraBold}) format('woff');
    font-weight: 800;
    font-style: normal;
  }

  html {
    background-color: #292636;
    font-family: 'Proxima Nova';
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    height: 100%;
  }

  body {
    background-color: #292636;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`
