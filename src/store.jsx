import { createSignal, onMount } from "solid-js";
import { createGrid, generateSequence } from "./functions/gameLogic";

export const [grid, setGrid] = createSignal([]);
export const [sequence, setSequence] = createSignal([]);

onMount(() => {
  const generatedGrid = createGrid(3, 3);
  const generatedSequence = generateSequence(generatedGrid, 2);

  setGrid(generatedGrid);
  setSequence(generatedSequence);
});
