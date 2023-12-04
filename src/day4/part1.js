import { readFile } from "../utils.js";

const input = readFile(4, 1);

const lines = input.split("\n").map((line) => line.trim());

function calculatePoints(matches) {
  if (matches == 0) return 0;
  if (matches == 1) return 1;

  let point = 1;
  matches--;

  for (let i = 0; i < matches; i++) {
    point *= 2;
  }
  return point;
}
const cards = lines.map((line) => {
  let [card, numbers] = line.split(":");

  const cardNumber = parseInt(card.trim().replace("Card ", "").trim());

  let [winningNumbers, availableNumbers] = numbers.trim().split("|");

  winningNumbers = winningNumbers
    .split(" ")
    .filter((number) => number.trim() != "")
    .map((number) => parseInt(number.trim()));

  availableNumbers = availableNumbers
    .split(" ")
    .filter((number) => number.trim() != "")
    .map((number) => parseInt(number.trim()));

  //   console.log(`Card ${cardNumber}: ${winningNumbers} | ${availableNumbers}`);

  const count = availableNumbers.filter((number) =>
    winningNumbers.includes(number)
  ).length;

  let points = calculatePoints(count);

  return {
    cardNumber: cardNumber,
    count: count,
    points: points,
  };
});

let cardInstances = {};
function processCard(card) {
  if (cardInstances[card.cardNumber] == undefined) {
    cardInstances[card.cardNumber] = 0;
  }
  cardInstances[card.cardNumber]++;

  if (card.count == 0) return;
  let startCardNumber = card.cardNumber + 1;
  let endCardNumber = card.cardNumber + card.count;

  cards.slice(startCardNumber - 1, endCardNumber).forEach((card) => {
    processCard(card);
  });
}

cards.forEach((card) => {
  processCard(card);
});
const result1 = cards
  .map((card) => card.points)
  .reduce((acc, curr) => acc + curr, 0);

console.log(result1);

const result2 = Object.values(cardInstances).reduce((acc, curr) => acc + curr);
console.log(result2);
