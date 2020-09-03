import css from '@emotion/css'

export default {
  fileConverter: css({
    display: 'flex',
    flexDirection: 'row',

    '& > *:not(:first-child)': {
      marginLeft: 6,
    },
    '& > *:not(:last-child)': {
      marginRight: 6,
    },
  }),

  fileColumn: css({
    flexBasis: 0,
    flexGrow: 1,
    marginTop: 0,
  }),

  fileInfo: css({
    marginTop: 12,
  }),

  fileInfoItem: css({
    marginTop: 8,
  }),

  filePreview: css({
    width: '100%',
    height: '100%',
  }),
}
