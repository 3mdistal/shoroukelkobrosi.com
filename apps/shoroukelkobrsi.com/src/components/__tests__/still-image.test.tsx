import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import StillImage from "../still-image";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver =
  mockIntersectionObserver as unknown as typeof IntersectionObserver;

describe("StillImage", () => {
  const props = {
    imageUrl: "https://example.com/image.jpg",
    width: 800,
    height: 600,
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the image with correct props", () => {
    render(<StillImage {...props} />);
    const containers = screen.getAllByTestId("still-image-container");
    expect(containers.length).toBeGreaterThan(0);
    const container = containers[0];
    expect(container).toBeDefined();
    const image = container.querySelector("img");
    expect(image).toBeDefined();
    expect(image?.getAttribute("alt")).toBe("Still image");
  });

  it("applies visible class when isVisible is true", async () => {
    const { rerender } = render(<StillImage {...props} />);
    const containers = screen.getAllByTestId("still-image-container");
    const container = containers[0];
    expect(container.classList.contains("visible")).toBe(false);
    // Simulate intersection observer callback
    const observerCallback = mockIntersectionObserver.mock
      .calls[0][0] as IntersectionObserverCallback;
    act(() => {
      observerCallback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    // Wait for any asynchronous updates
    await vi.runAllTimersAsync();
    rerender(<StillImage {...props} />);

    // Log the classList for debugging
    console.log("ClassList:", container.classList);

    expect(container.classList.contains("visible")).toBe(true);
  });
});
