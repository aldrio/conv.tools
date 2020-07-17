import { css } from '@emotion/core'

export default {
  footer: css({
    marginTop: '5.0rem',
  }),

  inner: css({
    padding: '0.6rem 2.0rem',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',

    '& > *': {
      marginLeft: 8,
      marginRight: 8,
    },
    '& > a': {
      color: '#fff',
      textDecoration: 'none',
    },
    '& > a:hover': {
      color: 'rgba(255, 255, 255, 0.5)',
      textDecoration: 'none',
    },
  }),
}
