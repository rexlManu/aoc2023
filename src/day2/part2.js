import { readFile } from "../utils.js";

const input = readFile(2, 2);

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
  .map((game) => {
    return game.sets.reduce((prev, curr) => {
      Object.keys(curr).forEach((color) => {
        if ((prev[color] ?? 0) < curr[color]) {
          prev[color] = curr[color];
        }
      });

      return prev;
    }, {});
  })
  .map((set) => Object.values(set).reduce((prev, curr) => prev * curr))
  .reduce((prev, curr) => prev + curr);

console.log(result);
