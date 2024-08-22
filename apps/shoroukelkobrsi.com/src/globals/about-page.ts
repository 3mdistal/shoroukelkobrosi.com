import type { GlobalConfig } from 'payload'
import { revalidateTag } from 'next/cache'
import {
  HTMLConverterFeature,
  BoldFeature,
  ItalicFeature,
  lexicalEditor,
  lexicalHTML,
} from '@payloadcms/richtext-lexical'
import { getURL } from '../utilities/get-url'
import { validateRichTextLength } from '../components/utils/validate-rich-text-length'

// Adjust max character count here.
const maxCharacterCount = {
  personal: 1100,
  professional: 600,
}

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  admin: {
    livePreview: {
      url: `${getURL()}/about`,
    },
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      maxLength: 38,
      required: true,
    },
    {
      name: 'personal-intro',
      type: 'richText',
      label: `Personal Intro. Max ${maxCharacterCount.personal.toString()} characters.`,
      validate: validateRichTextLength(maxCharacterCount.personal),
      editor: lexicalEditor({
        features: () => [BoldFeature(), ItalicFeature(), HTMLConverterFeature()],
      }),
      required: true,
    },
    {
      name: 'personal-photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    lexicalHTML('personal-intro', {
      name: 'personal-intro_html',
    }),
    {
      name: 'professional-intro',
      type: 'richText',
      label: `Professional Intro. Max ${maxCharacterCount.professional.toString()} characters.`,
      validate: validateRichTextLength(maxCharacterCount.professional),
      editor: lexicalEditor({
        features: () => [BoldFeature(), ItalicFeature(), HTMLConverterFeature()],
      }),
      required: true,
    },
    lexicalHTML('professional-intro', {
      name: 'professional-intro_html',
    }),
    {
      name: 'professional-photo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'professional-logos',
      type: 'array',
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      required: true,
    },
  ],
  hooks: {
    afterChange: [
      () => {
        revalidateTag('about-page')
      },
    ],
  },
  versions: true,
}
