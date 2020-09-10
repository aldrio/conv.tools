import { css } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'

export default {
  global: css`
    @import url('https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@700&family=Lato&display=swap');
    ${emotionNormalize}
    html,
    body,
    #___gatsby {
      padding: 0;
      margin: 0;
      background: #fff;
      min-height: 100vh;
      font-family: Lato, Helvetica, Arial, sans-serif;
      line-height: 1.5rem;
      color: #333;
    }

    h1 {
      font-family: Karla, Helvetica, Arial, sans-serif;
    }

    a {
      outline: 0;
      transition: color 0.3s ease;
      color: #6d8355;
    }

    a:hover {
      color: #8c9d79;
    }
  `,

  layout: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundAttachment: 'fixed',
  }),

  content: css({
    padding: '1.45rem 1.45rem',
  }),

  spacer: css({
    flexGrow: 1,
  }),

  minimalContainer: css({
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
}
