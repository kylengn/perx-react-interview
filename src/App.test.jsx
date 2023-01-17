import { describe, test, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

describe("<App />", () => {
  test("App mounts properly", () => {
    const wrapper = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(wrapper).toBeTruthy();
  });
});
