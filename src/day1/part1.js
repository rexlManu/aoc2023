import { readFile } from "../utils.js";

const input = readFile(1, 1);

console.log(
  input
    .split("\n")
    .map((value) => {
      return value
        .split("")
        .filter((char) => Number.isInteger(parseInt(char)))
        .filter((char, index, array) => index == 0 || index == array.length - 1)
        .flatMap((value, index, array) =>
          array.length == 1 ? [value, value] : value
        )
        .reduce((prev, curr, index, array) => prev + curr, "");
    })
    .map((value) => parseInt(value))
    .reduce((prev, curr) => prev + curr)
);
