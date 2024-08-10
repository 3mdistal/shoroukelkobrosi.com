import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publicationDate: z.date(),
    tags: z.array(z.string()),
    ogImage: z.string(),
  }),
});

const studio = defineCollection({
  type: "content",
  schema: z.object({
    published: z.boolean(),
    sequence: z.number(),
    title: z.string(),
    subtitle: z.string(),
    shortenedLogoText: z.string(),
    image: z.string(),
    imageAlt: z.string(),
    description: z.string(),
    destinationUrl: z.string(),
    buttonText: z.string(),
  }),
});

const studioLandingPage = defineCollection({
  type: "data",
  schema: z.object({
    items: z.array(
      z.object({
        ButtonText: z.string(),
        Description: z.string(),
        Destination: z.string(),
        Image: z.string(),
        ImageAlt: z.string(),
        Order: z.number(),
        Published: z.boolean(),
        "Shortened Logo Text": z.string(),
        Subtitle: z.string(),
        Title: z.string(),
      }),
    ),
  }),
});

export const collections = {
  blog: blogCollection,
  studio: studio,
  studioLandingPage: studioLandingPage,
};
