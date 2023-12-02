import { readFile } from "../utils.js";

const input = readFile(2, 1);

const cubes = {
  red: 12,
  green: 13,
  blue: 14,
};

const result = input
  .split("\n")
  .map((value) => {
    let [gameId, sets] = value.split(":");

    gameId = gameId.replace("Game ", "");

    return {
      id: parseInt(gameId),
      sets: sets.split(";").map((set) => {
        return set
          .split(",")
          .map((value) => {
            let [number, color] = value.trim().split(" ");

            number = parseInt(number);

            return {
              [color]: number,
            };
          })
          .reduce((prev, curr) => {
            return {
              ...prev,
              ...curr,
            };
          }, {});
      }),
    };
  })
  .filter(
    (game) =>
      game.sets.filter((set) =>
        Object.keys(cubes).every((color) => cubes[color] >= (set[color] ?? 0))
      ).length == game.sets.length
  )
  .map((game) => game.id)
  .reduce((prev, curr) => prev + curr);

console.log(result);
