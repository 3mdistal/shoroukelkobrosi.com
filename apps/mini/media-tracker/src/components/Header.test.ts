import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { expect, test } from "vitest";
import Header from "./Header.astro";

test("Header component", async () => {
  const container = await AstroContainer.create();
  const result = await container.renderToString(Header, {
    props: {
      title: "Test Title",
    },
  });

  expect(result).toContain("Test Title");
});
