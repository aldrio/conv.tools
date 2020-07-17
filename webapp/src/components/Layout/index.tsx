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
  splash?: string
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  minimal = false,
  splash,
}) => {
  return (
    <>
      <Global styles={styles.global} />
      <ThemeProvider theme={theme}>
        <div
          css={[
            styles.layout,
            splash && {
              backgroundImage: `url(${splash})`,
              backgroundRepeat: 'norepeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            },
          ]}
        >
          <Header minimal={minimal} />
          {minimal ? (
            <div css={styles.minimalContainer}>{children}</div>
          ) : (
            <Container>{children}</Container>
          )}
          <div css={styles.spacer} />
          <Footer />
        </div>
      </ThemeProvider>
    </>
  )
}
