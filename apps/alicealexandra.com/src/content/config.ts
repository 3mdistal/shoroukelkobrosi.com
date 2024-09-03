import { z, defineCollection } from "astro:content";

const blogCategories = [
  "Devlog",
  "Humor",
  "Life",
  "Lyric",
  "Tech",
  "Update",
] as const;

const blogs = defineCollection({
  type: "content",
  schema: z.object({
    category: z.enum(blogCategories),
    ogDescription: z.string(),
    ogImage: z.string(),
    publicationDate: z.date(),
    published: z.boolean(),
    subtitle: z.string(),
    summary: z.string(),
    title: z.string(),
  }),
});

const studioLandingPage = defineCollection({
  type: "data",
  schema: z.object({
    items: z.array(
      z.object({
        buttonText: z.string(),
        description: z.string(),
        destination: z.string(),
        image: z.string(),
        imageAlt: z.string(),
        order: z.number(),
        published: z.boolean(),
        shortenedLogoText: z.string(),
        subtitle: z.string(),
        title: z.string(),
      }),
    ),
  }),
});

export const collections = {
  blogs,
  studioLandingPage,
};
