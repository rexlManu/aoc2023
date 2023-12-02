import { readFile } from "../utils.js";

const input = readFile(1, 1);

const numbers = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function numberOrDigit(value, isLast) {
  const char = value.split("")[isLast ? value.length - 1 : 0];
  if (Number.isInteger(parseInt(char))) {
    return parseInt(char);
  }

  const foundNumber = numbers.find((number) =>
    isLast ? value.endsWith(number) : value.startsWith(number)
  );
  if (foundNumber) {
    return numbers.indexOf(foundNumber) + 1;
  }

  return numberOrDigit(isLast ? value.slice(0, -1) : value.slice(1), isLast);
}

const result = input
  .split("\n")
  .map((value) => {
    return [numberOrDigit(value, false), numberOrDigit(value, true)].reduce(
      (prev, curr) => prev + curr,
      ""
    );
  })
  .map((value) => parseInt(value))
  .reduce((prev, curr) => prev + curr);

console.log(result);
