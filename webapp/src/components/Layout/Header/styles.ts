import { css } from '@emotion/core'

export default {
  navbar: css({
    marginBottom: '2.0rem',
  }),

  brandLink: css({
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),

  brandLogo: css({
    marginRight: 16,
  }),

  brandTitle: css({
    fontFamily: "'Baloo Da 2'",
    fontSize: 24,
  }),
}
