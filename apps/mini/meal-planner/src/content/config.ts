import { defineCollection, z } from "astro:content";

const recipeCollection = defineCollection({
  type: "data",
  schema: z.object({
    $schema: z.string().optional(),
    data: z.array(
      z.object({
        name: z.string(),
        type: z.enum(["breakfast", "dinner", "snack", "dessert", "fruit"]),
      }),
    ),
  }),
});

export const collections = {
  recipes: recipeCollection,
};
