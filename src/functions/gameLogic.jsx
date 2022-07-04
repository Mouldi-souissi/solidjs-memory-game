export const createGrid = (lix_x, lim_y) => {
  const grid = [];
  let id = 0;

  for (let i = 0; i < lix_x; i++) {
    for (let j = 0; j < lim_y; j++) {
      id = id + 1;
      grid.push({ x: j, y: i, isHidden: true, id });
    }
  }
  return grid;
};

export const generateSequence = (grid, sequenceLength) => {
  const sequence = [];

  // random
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

  for (let i = 0; i < sequenceLength; i++) {
    const randomIndex = getRandomIntInclusive(0, grid.length - 1);
    sequence.push(grid[randomIndex].id);
  }

  return sequence;
};
