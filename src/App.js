import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { renderRoutes } from 'react-router-config'
import { themeDefault } from './themes/default.theme'
import GlobalStyle from './global'

const App = ({ route }) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={themeDefault}>
        {renderRoutes(route.routes)}
      </ThemeProvider>
    </React.Fragment>
  )
}

App.defaultProps = {
  route: null,
}

export default App
