import React, { useState, useEffect, useCallback } from 'react'
import { InputGroup, Text, Divider, Alert, Button, Select } from 'sancho'
import styles from './styles'
import { FileInput } from 'components/FileUpload'
import prettyBytes from 'pretty-bytes'
import download from 'downloadjs'
import contentDisposition from 'content-disposition'
import { FormatMimes, FormatMime, Formats } from './formats'

export type FileConverterProps = {}

export const FileConverter: React.FC<FileConverterProps> = ({}) => {
  const [file, setFile] = useState<File | null>(null)

  const [toFormat, setToFormat] = useState<FormatMime | null>(null)
  const format = file && Formats[file.type as FormatMime]
  const availableOutputs =
    format && (Object.keys(format.outputs) as FormatMime[])

  // Set item preview when file is updated
  const [itemPreview, setItemPreview] = useState<JSX.Element | null>(null)
  useEffect(() => {
    if (!file) {
      return
    }

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
  }, [file])

  // Auto select first available format when changed
  useEffect(() => {
    if (!availableOutputs) {
      return
    }

    setToFormat(availableOutputs[0] || null)
  }, [JSON.stringify(availableOutputs)])

  const onDownload = useCallback(async () => {
    if (!file || !toFormat) {
      return
    }
    // Send form
    const formData = new FormData()
    formData.append('file', file!)
    formData.append('toFormat', toFormat)

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
  }, [file, toFormat])

  return (
    <div css={styles.fileConverter}>
      <InputGroup label="From" css={styles.fileColumn}>
        <FileInput
          hint="Drop files to convert"
          accept={[...FormatMimes]}
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
        {file && (
          <>
            {availableOutputs && availableOutputs.length > 0 ? (
              <div css={styles.fileInfoItem}>
                <Select
                  onChange={(event) =>
                    setToFormat(event.target.value as FormatMime)
                  }
                >
                  {availableOutputs.map((mime) => (
                    <option value={mime}>
                      {Formats[mime].ext.toUpperCase()}
                    </option>
                  ))}
                </Select>
              </div>
            ) : (
              <Alert intent="danger" title="Can't convert this file" />
            )}
            {toFormat && (
              <div css={styles.fileInfoItem}>
                <Button block onClick={onDownload}>
                  Download
                </Button>
              </div>
            )}
          </>
        )}
      </InputGroup>
    </div>
  )
}
