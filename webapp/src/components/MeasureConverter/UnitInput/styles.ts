import css from '@emotion/css'

export default {
  inputContainer: css({
    position: 'relative',
  }),

  comboBoxInput: css({
    backgroundColor: 'transparent',
    cursor: 'pointer',
    borderRadiusTopRight: 0,
  }),

  inputArrow: css({
    position: 'absolute',
    top: 0,
    right: 12,
    bottom: 0,

    // Center vertically
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    // Let clicks go through to the input
    pointerEvents: 'none',
  }),

  comboBoxList: css({
    maxHeight: 300,
    zIndex: 10,
    overflow: 'scroll',
  }),
}
