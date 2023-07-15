import React from "react";
import { render, screen } from "@testing-library/react";
import Count from "./count";
import userEvent from "@testing-library/user-event";

describe("Countコンポーネント", () => {
  test("ボタンをクリックするとカウントがインクリメントされる", async () => {
    const { getByText } = render(<Count />);
    const incrementButton = getByText("increment");
    const countDisplay = getByText("0");

    // async/awaitじゃないとだめっぽい
    await userEvent.click(incrementButton);

    expect(countDisplay.textContent).toBe("1");
  });

  test("リセットボタンをクリックするとカウントがリセットされる", async () => {
    const { getByText } = render(<Count />);
    const resetButton = getByText("reset");
    const countDisplay = getByText("0");

    // async/awaitじゃないとだめっぽい
    await userEvent.click(resetButton);

    expect(countDisplay.textContent).toBe("0");
  });
});
