import React from 'react'
import styles from './styles'
import { useDropzone } from 'react-dropzone'
import { useTheme } from 'sancho'
import css, { SerializedStyles } from '@emotion/css'

export type FileInputProps = {
  hint?: string
  hoverHint?: string
  accept?: string | string[]
  onDropAccepted: <T extends File>(files: T[]) => void
}

export const FileInput: React.FC<FileInputProps> = ({
  accept,
  hint = 'Drag and drop some files here, or click to select files',
  hoverHint = 'Drop here...',
  onDropAccepted,
  children,
}) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDropAccepted, accept })

  const theme = useTheme()
  let statusStyle: SerializedStyles | undefined
  if (isDragAccept) {
    statusStyle = css({
      borderColor: theme.colors.intent.success.lightest,
    })
  } else if (isDragReject) {
    statusStyle = css({
      borderColor: theme.colors.intent.danger.light,
    })
  }

  return (
    <div {...getRootProps()} css={[styles.fileInput, statusStyle]}>
      <input {...getInputProps()} />
      {children ? children : isDragActive ? <p>{hoverHint}</p> : <p>{hint}</p>}
    </div>
  )
}
