import React from 'react'
import { Header } from './Header'
import { Global } from '@emotion/core'
import styles from './styles'
import { Footer } from './Footer'
import {
  generateColorsFromScales,
  ThemeProvider,
  defaultTheme,
  Container,
} from 'sancho'
import palx from 'palx'
import BackgroundImage from 'gatsby-background-image'

const scales = palx('#08e')
const colors = generateColorsFromScales(scales)

const theme = {
  ...defaultTheme,
  ...colors,
  fonts: {
    ...defaultTheme.fonts,
    sans: 'Karla, sans-serif',
    base: 'Lato, sans-serif',
  },
}

export type LayoutProps = {
  minimal?: boolean
  splash?: any
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  minimal = false,
  splash,
}) => {
  let inner = (
    <>
      <Header minimal={minimal} />
      {minimal ? (
        <div css={styles.minimalContainer}>{children}</div>
      ) : (
        <Container>{children}</Container>
      )}
      <div css={styles.spacer} />
      <Footer />
    </>
  )

  if (splash) {
    inner = (
      <BackgroundImage
        Tag="div"
        css={styles.layout}
        fluid={splash}
        backgroundColor="#ccc"
      >
        {inner}
      </BackgroundImage>
    )
  } else {
    inner = <div css={styles.layout}>{inner}</div>
  }

  return (
    <>
      <Global styles={styles.global} />
      <ThemeProvider theme={theme}>{inner}</ThemeProvider>
    </>
  )
}
