import React, { useState, useEffect } from 'react'
import { InputGroup, Text } from 'sancho'
import styles from './styles'
import { FileInput } from 'components/FileUpload'
import prettyBytes from 'pretty-bytes'

export type FileConverterProps = {}

export const FileConverter: React.FC<FileConverterProps> = ({}) => {
  const [file, setFile] = useState<File | null>(null)

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  useEffect(() => {
    if (file) {
      // TODO: verify it is an image
      setImageSrc(URL.createObjectURL(file))
    }
  }, [file])

  return (
    <div css={styles.fileConverter}>
      <InputGroup label="From" css={styles.fileColumn}>
        <FileInput onDropAccepted={(files) => setFile(files[0])} />

        {file && (
          <div css={styles.fileInfo}>
            {imageSrc && (
              <div css={styles.fileInfoItem}>
                <img src={imageSrc} css={{ width: '100%', height: '100%' }} />
              </div>
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
        )}
      </InputGroup>
      <InputGroup label="To" css={styles.fileColumn}></InputGroup>
    </div>
  )
}

BigInt
