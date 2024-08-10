<script lang="ts">
  interface StudioCardProps {
    title: string;
    subtitle: string;
    shortenedLogoText: string;
    image: string;
    imageAlt: string;
    description: string;
    buttonText: string;
    destination: string;
  }

  const {
    title,
    subtitle,
    shortenedLogoText,
    image,
    imageAlt,
    description,
    buttonText,
    destination,
  }: StudioCardProps = $props();

  let isFlipped = $state(false);

  function showBack() {
    isFlipped = true;
  }

  function showFront() {
    isFlipped = false;
  }

  function handleButtonClick() {
    window.location.href = destination as string;
  }
</script>

<div
  class="card"
  class:flipped={isFlipped}
  onmouseenter={showBack}
  onmouseleave={showFront}
  onfocus={showBack}
  onblur={showFront}
  tabindex="0"
  role="button"
  aria-label={title}
>
  <div class="card-front">
    <div class="logo-circle">
      <p class="logo-text">{shortenedLogoText}</p>
    </div>
    <div class="title-container">
      <h2>{title}</h2>
      <p><em>{subtitle}</em></p>
    </div>
    <img src={image} alt={imageAlt} class="background-image" />
    <div class="gradient-overlay"></div>
  </div>
  <div class="card-back">
    <p class="description"><em>{description}</em></p>
    <button class="cta-button" onclick={handleButtonClick}>{buttonText}</button>
  </div>
</div>

<style>
  :global(:root) {
    --studio-bg-color: #e6f3ff;
    --studio-accent-color: #0077be;
  }

  .card {
    position: relative;
    perspective: 1000px;
    cursor: pointer;
    aspect-ratio: 2/3;
    width: 20rem;
  }

  .card-front,
  .card-back {
    display: flex;
    position: absolute;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    backface-visibility: hidden;
    transition: transform 0.6s;
    box-sizing: border-box;
    border-radius: 1.5rem;
    padding: 1rem;
    width: 100%;
    height: 100%;
  }

  .card-front {
    background-color: var(--studio-bg-color, #000);
    color: white;
  }

  .card-back {
    transform: rotateY(180deg);
    background-color: var(--studio-bg-color, #000);
    color: white;
  }

  .card.flipped .card-front {
    transform: rotateY(180deg);
  }

  .card.flipped .card-back {
    transform: rotateY(0);
  }

  .logo-circle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
    border: 2px solid white;
    border-radius: 50%;
    background-color: var(--studio-bg-color, #000);
    width: 4.5rem;
    height: 4.5rem;
  }

  .logo-text {
    font-weight: 500;
    font-size: 2.75rem;
  }

  .title-container {
    margin-bottom: 1rem;
    text-align: center;
  }

  h2 {
    margin-bottom: 0.5rem;
    font-weight: 300;
    font-size: 1.5rem;
    letter-spacing: 0.15em;
  }

  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.8;
    z-index: -1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.8;
    z-index: -1;
    background: linear-gradient(
      to top,
      var(--studio-bg-color, #000),
      transparent
    );
    width: 100%;
    height: 100%;
  }

  .description {
    margin-bottom: 1rem;
    text-align: center;
  }

  .cta-button {
    cursor: pointer;
    border: none;
    border-radius: 0.25rem;
    background-color: var(--studio-accent-color, #fff);
    padding: 0.5rem 1rem;
    color: var(--studio-bg-color, #000);
    font-weight: bold;
  }
</style>
