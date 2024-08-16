import { defineAction, z } from "astro:actions";

export const homepage = {
  mediaInput: defineAction({
    accept: "form",
    input: z.object({
      title: z.string(),
      mediaType: z.enum([
        "movie",
        "tvshow",
        "book",
        "game",
        "music",
        "podcast",
        "youtubevideo",
        "weblink",
      ]),
    }),
    handler: async ({ title, mediaType }) => {
      // is this title actually this mediatype?
      // if not, use ai to find the correct mediatype and/or title
      // fetch all sever data
      // add to database

      return {
        success: true,
        message: `${title} added to ${mediaType}s.`,
      };
    },
  }),
};
