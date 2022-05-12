import { describe, test, beforeEach, afterEach, expect } from "vitest";
import { render, fireEvent, screen, waitFor } from "@testing-library/svelte";
import { createRandomDuck } from "../services/random";
import DuckListTestWrapper from "./DuckListTestWrapper.svelte";
import userEvent from "@testing-library/user-event";

describe("DuckList", () => {
  beforeEach(() => {
    // initializeCityDatabase();
  });

  afterEach(() => {
    // clearCityDatabase();
  });

  test("Duck lists are rendered", async () => {
    const user = userEvent.setup();
    const fireDuck = jest.fn();
    const ducks = Array.from({ length: 50 }).map(() => createRandomDuck());

    render(DuckListTestWrapper, { ducks, fireDuck });

    // console.log(ducks, "ducko");

    // Wait for page to update with query text
    const items = screen.getAllByRole("listitem");
    expect(items.length).toEqual(ducks.length);

    const btn = screen.getAllByRole("button", { name: "free" });

    await waitFor(() => expect(btn.length).toEqual(ducks.length));

    await waitFor(() => user.click(btn[0]));

    await waitFor(() => expect(fireDuck).toHaveBeenCalledTimes(1));
  });
});
