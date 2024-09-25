import type { Field } from 'payload'

export const OGInfo: Field = {
  name: 'og-info',
  label: 'Open Graph Info',
  type: 'array',
  required: true,
  maxRows: 1,
  fields: [
    {
      name: 'ogImage',
      label: 'Open Graph Image: For best results, use a 1200x630 image.',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'ogDescription',
      label: 'Open Graph Description: No more than 255 characters.',
      type: 'textarea',
      required: true,
      maxLength: 255,
    },
  ],
}
