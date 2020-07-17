import React from 'react'

import { Layout } from 'components/Layout'
import { Seo } from 'components/Seo'

import { Button, Text, Layer } from 'sancho'

const IndexPage: React.FC<{}> = () => {
  return (
    <Layout minimal splash={require('./splash.jpg')}>
      <Seo />

      <Layer>
        <Text variant="lead">Hello</Text>
        <Button>I am a button!</Button>
      </Layer>
    </Layout>
  )
}

export default IndexPage
