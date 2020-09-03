import React, { useState, useEffect, useCallback } from 'react'
import { InputGroup, Text, Divider, Alert, Button } from 'sancho'
import styles from './styles'
import { FileInput } from 'components/FileUpload'
import prettyBytes from 'pretty-bytes'
import download from 'downloadjs'
import contentDisposition from 'content-disposition'

export type FileConverterProps = {}

export const FileConverter: React.FC<FileConverterProps> = ({}) => {
  const [file, setFile] = useState<File | null>(null)

  const [itemPreview, setItemPreview] = useState<JSX.Element | null>(null)
  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      const { type } = file
      let preview = null

      const backup = <Alert intent="danger" title="Can't display this file" />

      if (type.startsWith('image/')) {
        preview = (
          <object data={url} type={type} css={styles.filePreview}>
            {backup}
          </object>
        )
      } else if (type.startsWith('video/')) {
        preview = (
          <video src={url} css={styles.filePreview} autoPlay muted controls>
            {backup}
          </video>
        )
      }

      setItemPreview(preview)
    }
  }, [file])

  const onDownload = useCallback(async () => {
    // Send form
    const formData = new FormData()
    formData.append('file', file!)

    const res = await fetch('http://localhost:8080/image', {
      method: 'POST',
      body: formData,
    })

    if (!res.ok) {
      // TODO: display error in json if available
      console.log('Error converting')
      return
    }

    // Download file and prompt user
    const mimeType = res.headers.get('Content-Type')!
    const disposition = contentDisposition.parse(
      res.headers.get('Content-Disposition')!
    )
    const filename = disposition.parameters.filename as string
    
    download(await res.blob(), filename, mimeType)
  }, [file])

  return (
    <div css={styles.fileConverter}>
      <InputGroup label="From" css={styles.fileColumn}>
        <FileInput
          hint="Drop files to convert"
          onDropAccepted={(files) => setFile(files[0])}
        />

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
      <InputGroup label="To" css={styles.fileColumn}>
        <Button block onClick={onDownload}>
          Download
        </Button>
      </InputGroup>
    </div>
  )
}
