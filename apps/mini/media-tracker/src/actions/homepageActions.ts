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
      console.log("Title", title);
      console.log("Media", mediaType);
      return {
        success: true,
      };
    },
  }),
};
