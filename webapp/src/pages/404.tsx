import React from 'react'

import { Layout } from 'components/Layout'
import { Seo } from 'components/Seo'

const NotFoundPage: React.FC<{}> = () => (
  <Layout>
    <Seo title="404: Not found" />
    <h1>NOT FOUND</h1>
    <p>This page doesn&#39;t exist...</p>
  </Layout>
)

export default NotFoundPage
