export const getURL = (): string => {
  if (process.env.VERCEL_ENV === "production") {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL ?? "error"}`;
  } else if (process.env.VERCEL_ENV === "preview") {
    return `https://${process.env.VERCEL_URL ?? "error"}`;
  }
  return "http://localhost:3000";
};
