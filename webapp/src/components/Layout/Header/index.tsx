import React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styles from './styles'
import { Text, IconRepeat, Navbar, Toolbar, DarkMode } from 'sancho'

export type HeaderProps = {
  minimal?: boolean
}

export const Header: React.FC<HeaderProps> = ({ minimal = false }) => {
  const { site } = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <DarkMode>
      <Navbar
        css={[styles.navbar, minimal && { backgroundColor: 'transparent' }]}
        position="static"
      >
        <Toolbar>
          <Link to="/" css={styles.brandLink}>
            <IconRepeat size="lg" css={styles.brandLogo} />
            <Text css={styles.brandTitle}>{site.siteMetadata.title}</Text>
          </Link>
        </Toolbar>
      </Navbar>
    </DarkMode>
  )
}
