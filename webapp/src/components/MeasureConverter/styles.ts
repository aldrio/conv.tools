import css from '@emotion/css'

export default {
  measureConverter: css({
    display: 'flex',
    flexDirection: 'row',

    '& > *:not(:first-child)': {
      marginLeft: 6,
    },
    '& > *:not(:last-child)': {
      marginRight: 6,
    },
  }),

  measureColumn: css({
    flexGrow: 1,
    marginTop: 0,
  }),

  measureInput: css({
    marginBottom: 4,
  }),
}
