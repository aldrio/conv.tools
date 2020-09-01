import React, { useState, useEffect } from 'react'
import { InputGroup, Text, Divider } from 'sancho'
import styles from './styles'
import { FileInput } from 'components/FileUpload'
import prettyBytes from 'pretty-bytes'

export type FileConverterProps = {}

export const FileConverter: React.FC<FileConverterProps> = ({}) => {
  const [file, setFile] = useState<File | null>(null)

  const [itemPreview, setItemPreview] = useState<JSX.Element | null>(null)
  useEffect(() => {
    if (file) {
      // TODO: verify it is an image
      const url = URL.createObjectURL(file)
      let preview = null
      if (file.type.startsWith('image/')) {
        preview = <img src={url} css={{ width: '100%', height: '100%' }} />
      } else if (file.type.startsWith('video/')) {
        preview = (
          <video
            src={url}
            css={{ width: '100%', height: '100%' }}
            autoPlay
            muted
            controls
          />
        )
      }

      setItemPreview(preview)
    }
  }, [file])

  return (
    <div css={styles.fileConverter}>
      <InputGroup label="From" css={styles.fileColumn}>
        <FileInput onDropAccepted={(files) => setFile(files[0])} />

        {file && (
          <>
            <Divider />
            <div css={styles.fileInfo}>
              {itemPreview && (
                <div css={styles.fileInfoItem}>{itemPreview}</div>
              )}
              <div css={styles.fileInfoItem}>
                <Text variant="uppercase">Type</Text>
                <Text>{file.type}</Text>
              </div>
              <div css={styles.fileInfoItem}>
                <Text variant="uppercase">Size</Text>
                <Text>{prettyBytes(file.size)}</Text>
              </div>
            </div>
          </>
        )}
      </InputGroup>
      <InputGroup label="To" css={styles.fileColumn}></InputGroup>
    </div>
  )
}

BigInt
