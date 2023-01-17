import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../components/Header";

describe("<Header />", () => {
  test("Header functions properly", () => {
    const header = render(<Header />);
    expect(header).toBeTruthy();

    const h2 = header.container.querySelector("h2");
    expect(h2?.textContent).toBe("Findr");
  });
});
