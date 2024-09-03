<script lang="ts">
  import { onMount } from "svelte";
  import Logo from "@assets/logo.png";
  import PlainCircle from "@assets/plain-circle.svg";

  let button: HTMLAnchorElement;
  let logo: HTMLImageElement;
  let circle: HTMLDivElement;

  function setStyles(
    element: HTMLElement,
    styles: Partial<CSSStyleDeclaration>,
  ) {
    Object.assign(element.style, styles);
  }

  function fadeIn() {
    if (button) {
      setStyles(button, {
        opacity: "1",
        transform: "rotate(360deg)",
        transition: "opacity 0.5s, transform 0.5s",
      });
    }
  }

  function toggleBackVisibility(show: boolean) {
    if (logo && circle) {
      const commonStyles = {
        transform: show ? "rotateY(0deg)" : "rotateY(180deg)",
        opacity: show ? "1" : "0",
      };

      setStyles(logo, {
        ...commonStyles,
        transform: show ? "rotateY(180deg)" : "rotateY(0deg)",
      });

      setStyles(circle, commonStyles);

      const text = circle.querySelector("p");
      if (text) {
        setStyles(text as HTMLElement, {
          opacity: show ? "1" : "0",
          transition: `opacity ${show ? "1s" : "0.1s"}`,
        });
      }
    }
  }

  const seeBack = () => toggleBackVisibility(true);
  const hideBack = () => toggleBackVisibility(false);

  onMount(() => {
    fadeIn();
    hideBack();
  });
</script>

<div class="menu-button-container">
  <a
    href="/"
    bind:this={button}
    class="menu-button"
    on:mouseenter={seeBack}
    on:mouseleave={hideBack}
  >
    <img
      src={Logo.src}
      alt="Home button logo."
      class="menu-button-logo"
      bind:this={logo}
    />
    <div bind:this={circle} class="menu-button-circle">
      <img
        src={PlainCircle.src}
        class="menu-button-logo"
        alt="Home button logo."
      />
      <p class="menu-button-text">home.</p>
    </div>
  </a>
</div>

<style>
  .menu-button-container {
    display: flex;
    position: fixed;
    top: 0.5rem;
    right: 0.5rem;
    align-items: center;
    z-index: 100;
  }

  .menu-button {
    transform: rotate(0deg);
    opacity: 0;
    transition:
      opacity 0.5s,
      transform 0.5s;
    width: 3.5rem;
    height: 3.5rem;
  }

  .menu-button-logo {
    position: absolute;
    transition:
      opacity 0.5s,
      transform 0.5s;
    width: 100%;
    height: 100%;
  }

  .menu-button-circle {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    transition:
      opacity 0.5s,
      transform 0.5s;
    width: 100%;
    height: 100%;
  }

  .menu-button-text {
    z-index: 10;
    transition: opacity 0.5s;
    color: white;
    font-weight: 500;
    font-size: 0.875rem;
  }

  @media (min-width: 768px) {
    .menu-button-container {
      top: 1.5rem;
      right: 1.5rem;
    }

    .menu-button {
      width: 5rem;
      height: 5rem;
    }

    .menu-button-text {
      font-size: 1.25rem;
    }
  }
</style>
