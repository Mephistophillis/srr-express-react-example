import styledNormalize from 'styled-normalize'
import { themeDefault } from '../themes/default.theme'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  ${styledNormalize}

  html{
      width: 100%;
  }
  body {
      font-family: ${themeDefault.font.f1};
      -webkit-font-smoothing: antialiased;
      position: relative;
      width: 100%;
      background-color:  ${themeDefault.color.primary};
  }
  a {
    text-decoration: none;
    color: inherit;
  }

  input, textarea{
      outline: none;
  }
`

export default GlobalStyle
