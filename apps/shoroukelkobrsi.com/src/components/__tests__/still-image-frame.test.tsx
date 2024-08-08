import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import StillImageFrame from "../still-image-frame";

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => {
    // Mock Next.js Image component with a standard img element
    return <img {...props} alt={(props.alt as string) || ""} />;
  },
}));

vi.mock("../still-image", () => ({
  default: ({ imageUrl }: { imageUrl: string }) => (
    <img src={imageUrl} alt="Film still" data-testid="still-image" />
  ),
}));

describe("StillImageFrame", () => {
  const props = {
    imageUrl: "https://example.com/image.jpg",
    location: "Test Location",
    width: 800,
    height: 600,
  };

  it("renders the StillImage component with correct props", () => {
    render(<StillImageFrame {...props} />);
    const container = screen.getAllByTestId("parallax-container")[0];
    expect(container).toBeDefined();
  });

  it("shows location overlay on hover", () => {
    render(<StillImageFrame {...props} />);
    const container = screen.getAllByTestId("parallax-container")[0];
    expect(screen.queryByText(props.location)).not.toBeTruthy();

    fireEvent.mouseEnter(container);
    expect(screen.getByText(props.location)).toBeTruthy();

    fireEvent.mouseLeave(container);
    expect(screen.queryByText(props.location)).toBeNull();
  });

  it("applies parallax effect on scroll", async () => {
    vi.useFakeTimers();
    const { rerender } = render(<StillImageFrame {...props} />);

    const innerContainers = screen.getAllByTestId("parallax-inner");
    const innerContainer = innerContainers[0];
    const initialTransform = innerContainer.style.transform;

    // Simulate scroll event
    act(() => {
      global.innerHeight = 1000;
      global.scrollY = 100;
      global.dispatchEvent(new Event("scroll"));
    });

    // Wait for any asynchronous updates
    await vi.runAllTimersAsync();
    rerender(<StillImageFrame {...props} />);

    // Check if the transform style has changed
    expect(innerContainer.style.transform).not.toBe(initialTransform);

    vi.useRealTimers();
  });
});
