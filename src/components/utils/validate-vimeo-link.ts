import type { Validate } from 'payload'

export const validateVimeoLink: Validate<string | string[], unknown> = (value) => {
  if (typeof value === 'string') {
    const vimeoRegex = /^(https?:\/\/)?(www\.)?(player\.)?vimeo\.com\//
    if (!vimeoRegex.test(value)) {
      return 'URL must be a valid Vimeo link'
    }
  }
  return true
}
