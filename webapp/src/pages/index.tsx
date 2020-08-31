import React, { useState } from 'react'

import { useStaticQuery, graphql } from 'gatsby'
import { Layout } from 'components/Layout'
import { Seo } from 'components/Seo'

import { Layer, Text, DarkMode, useTheme, Toolbar, Tabs, Tab } from 'sancho'
import { MeasureConverter } from 'components/MeasureConverter'
import { FileConverter } from 'components/FileConverter'

const IndexPage: React.FC<{}> = () => {
  const { file } = useStaticQuery(graphql`
    query LayoutQuery {
      file(relativePath: { eq: "splash.jpg" }) {
        childImageSharp {
          fluid(
            quality: 90
            maxWidth: 1920
            traceSVG: { color: "#CCAF9C", background: "#CDDCE2" }
          ) {
            ...GatsbyImageSharpFluid_withWebp_tracedSVG
          }
        }
      }
    }
  `)
  const splash = file.childImageSharp.fluid

  const theme = useTheme()

  const [index, setIndex] = useState(0)

  return (
    <Layout minimal splash={splash}>
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
                <Tab id="files">Files</Tab>
              </Tabs>
            </div>
          )}
        </DarkMode>
        <div css={{ padding: 12 }}>
          {index === 0 && <MeasureConverter />}
          {index === 1 && <FileConverter />}
        </div>
      </Layer>
    </Layout>
  )
}

export default IndexPage
