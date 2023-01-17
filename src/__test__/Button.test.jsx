import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Button from "../components/Button";

describe("<Button />", () => {
  test("Button functions properly", () => {
    const button = render(<Button />);
    expect(button).toBeTruthy();

    const btn = button.container.querySelector("button");
    expect(btn?.textContent).toBe("");
  });
});
