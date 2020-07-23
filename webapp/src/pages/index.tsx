import React, { useState } from 'react'

import { Layout } from 'components/Layout'
import { Seo } from 'components/Seo'

import { Layer, Text, DarkMode, useTheme, Toolbar, Tabs, Tab } from 'sancho'
import { MeasureConverter } from 'components/MeasureConverter'

const IndexPage: React.FC<{}> = () => {
  const theme = useTheme()

  const [index, setIndex] = useState(0)

  return (
    <Layout minimal splash={require('./splash.jpg')}>
      <Seo />

      <Layer
        css={{
          width: 500,
          maxWidth: 500,
          minHeight: 500,
          overflow: 'hidden',
        }}
      >
        <DarkMode>
          {(darkTheme) => (
            <div css={{ background: darkTheme.colors.background.tint2 }}>
              <Toolbar css={{ paddingTop: theme.spaces.md }} compressed>
                <Text variant="h5">Conversions</Text>
              </Toolbar>
              <Tabs value={index} onChange={(i) => setIndex(i)}>
                <Tab id="measurements">Measurements</Tab>
              </Tabs>
            </div>
          )}
        </DarkMode>
        <div css={{ padding: 12 }}>
          <MeasureConverter />
        </div>
      </Layer>
    </Layout>
  )
}

export default IndexPage
