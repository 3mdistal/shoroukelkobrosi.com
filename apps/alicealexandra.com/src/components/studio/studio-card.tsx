import { component$, useSignal, $, useStyles$ } from "@builder.io/qwik";
import styles from "./studio-card.css?inline";

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

export default component$((props: StudioCardProps) => {
  useStyles$(styles);
  const isFlipped = useSignal(false);

  const showBack = $(() => {
    isFlipped.value = true;
  });

  const showFront = $(() => {
    isFlipped.value = false;
  });

  const handleButtonClick = $(() => {
    window.location.href = props.destination;
  });

  return (
    <div
      class={`card ${isFlipped.value ? "flipped" : ""}`}
      onMouseEnter$={showBack}
      onMouseLeave$={showFront}
      onFocus$={showBack}
      onBlur$={showFront}
      tabIndex={0}
      role="button"
      aria-label={props.title}
    >
      <div class="cardFront">
        <div class="logoCircle">
          <p class="logoText">{props.shortenedLogoText}</p>
        </div>
        <div class="titleContainer">
          <h2 class="title">{props.title}</h2>
          <p>
            <em>{props.subtitle}</em>
          </p>
        </div>
        <img src={props.image} alt={props.imageAlt} class="backgroundImage" />
        <div class="gradientOverlay"></div>
      </div>
      <div class="cardBack">
        <p class="description">
          <em>{props.description}</em>
        </p>
        <button class="ctaButton" onClick$={handleButtonClick}>
          {props.buttonText}
        </button>
      </div>
    </div>
  );
});
