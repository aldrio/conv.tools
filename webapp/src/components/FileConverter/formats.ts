export const FormatMimes = [
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/tiff',
  'application/pdf',
  'image/svg+xml'
] as const
export type FormatMime = typeof FormatMimes[number]

export type FormatOutput = {
  endpoint: 'image'
}

export type Format = {
  outputs: Partial<Record<FormatMime, FormatOutput>>
  ext: string
}

const imageOutputs: Partial<Record<FormatMime, FormatOutput>> = {
  'image/png': { endpoint: 'image' },
  'image/jpeg': { endpoint: 'image' },
  'image/webp': { endpoint: 'image' },
}

export const Formats: Record<FormatMime, Format> = {
  'image/png': {
    outputs: imageOutputs,
    ext: 'png',
  },
  'image/jpeg': {
    outputs: imageOutputs,
    ext: 'jpg',
  },
  'image/webp': {
    outputs: imageOutputs,
    ext: 'webp',
  },
  'image/tiff': {
    outputs: imageOutputs,
    ext: 'tiff',
  },
  'application/pdf': {
    outputs: imageOutputs,
    ext: 'pdf',
  },
  'image/svg+xml': {
    outputs: imageOutputs,
    ext: 'svg',
  },
}
