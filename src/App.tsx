import * as React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme/dark'
import { GlobalStyle } from './layouts/GlobalStyle'
import { DataContextProvider } from './components/DataContext'
import { PictureModalContextProvider } from './components/PictureModalContext'
import { Routes } from './routes'

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <DataContextProvider>
          <PictureModalContextProvider>
            <Routes />
          </PictureModalContextProvider>
          {/*<CoreLayout>*/}
          {/*  <DefaultContent header="Trending images">*/}
          {/*    <PictureGrid category={undefined} />*/}
          {/*  </DefaultContent>*/}
          {/*</CoreLayout>*/}
        </DataContextProvider>
      </ThemeProvider>
    </>
  )
}

export default App
