import { assertEquals, assertRejects } from "@std/assert";
import { sleep_sort } from "./mod.ts";

Deno.test("sleep_sort should sort numbers", async () => {
  const result = await sleep_sort([3, 1, 5, 4, 7, 1034, 90]);
  assertEquals(result, [1, 3, 4, 5, 7, 90, 1034]);
});

Deno.test("sleep_sort should sort strings by length", async () => {
  const result = await sleep_sort([
    "3",
    "21341",
    "123",
    "13",
    "123513513513",
    "1034",
    "90",
  ]);
  assertEquals(result, [
    "3",
    "13",
    "90",
    "123",
    "1034",
    "21341",
    "123513513513",
  ]);
});

Deno.test(
  "sleep_sort should sort not sort Array<T> if a delay function for T is not provided",
  async () => {
    type Coordinates = {
      x: number;
      y: number;
    };

    const coords = new Array<Coordinates>({ x: 1, y: -1 }, { x: 7, y: -2 });
    assertRejects(async () => {
      await sleep_sort(coords);
    });
  }
);

Deno.test(
  "sleep_sort should sort not sort Array<T> if a delay function for T is not provided",
  async () => {
    type Coordinates = {
      x: number;
      y: number;
    };

    const coords = new Array<Coordinates>({ x: 10, y: -1 }, { x: 7, y: -2 });
    const result = await sleep_sort(coords, (coordinate) => coordinate.x);
    assertEquals(result, [
      { x: 7, y: -2 },
      { x: 10, y: -1 },
    ]);
  }
);
