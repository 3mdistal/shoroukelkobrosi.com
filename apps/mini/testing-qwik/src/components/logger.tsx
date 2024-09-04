import { component$, useOnDocument, $ } from "@builder.io/qwik";

export const Logger = component$(() => {
  useOnDocument(
    "counter",
    $((event: CustomEvent<number>) => {
      console.log("Counter value:", event.detail);
    }),
  );

  return null;
});
