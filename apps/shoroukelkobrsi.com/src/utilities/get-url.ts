export const getURL = (): string => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? 'error'}`
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL ?? 'error'}`
  }
  return 'http://localhost:3000'
}
