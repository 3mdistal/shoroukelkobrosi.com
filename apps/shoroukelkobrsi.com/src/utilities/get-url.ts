// import { unstable_noStore as noStore } from "next/cache";

export const getURL = (): string => {
  // noStore();
  // eslint-disable-next-line no-console -- This is for debugging
  console.log("VERCEL_ENV:", process.env.NEXT_PUBLIC_VERCEL_ENV);
  // eslint-disable-next-line no-console -- This is for debugging
  console.log("VERCEL_URL:", process.env.NEXT_PUBLIC_VERCEL_URL);
  // eslint-disable-next-line no-console -- This is for debugging
  console.log(
    "VERCEL_PROJECT_PRODUCTION_URL:",
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
  );

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production") {
    const url = `https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL ?? "error"}`;
    // eslint-disable-next-line no-console -- This is for debugging
    console.log("Production URL:", url);
    return url;
  } else if (process.env.NEXT_PUBLIC_VERCEL_ENV === "preview") {
    const url = `https://${process.env.NEXT_PUBLIC_VERCEL_URL ?? "error"}`;
    // eslint-disable-next-line no-console -- This is for debugging
    console.log("Preview URL:", url);
    return url;
  }
  // eslint-disable-next-line no-console -- This is for debugging
  console.log("Default URL: http://localhost:3000");
  return "http://localhost:3000";
};
