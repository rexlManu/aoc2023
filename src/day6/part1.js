import { readFile } from "../utils.js";

const input = readFile(6, 1);

const test = `Time:      7  15   30
Distance:  9  40  200`;

const times = input
  .split("\n")[0]
  .split(":")[1]
  .trim()
  .split(" ")
  .filter((x) => x != "")
  .map((x) => parseInt(x));

const distances = input
  .split("\n")[1]
  .split(":")[1]
  .trim()
  .split(" ")
  .filter((x) => x != "")
  .map((x) => parseInt(x));

function calculatePower(holdingTime, time) {
  const remainingDrivingTime = time - holdingTime;

  if (remainingDrivingTime <= 0) {
    return 0;
  }

  return holdingTime * remainingDrivingTime;
}

let result1 = 1;
for (let i = 0; i < times.length; i++) {
  let time = times[i];
  let distance = distances[i];
  let possibleHoldingTimes = 0;

  for (let holdingTime = 1; holdingTime < time; holdingTime++) {
    const reachedDistance = calculatePower(holdingTime, time);

    if (reachedDistance > distance) {
      possibleHoldingTimes++;
    }
  }

  result1 *= possibleHoldingTimes;
}

console.log("result1", result1);

let time = parseInt(times.join(""));
let distance = parseInt(distances.join(""));

let possibleHoldingTimes = 0;

for (let holdingTime = 1; holdingTime < time; holdingTime++) {
  const reachedDistance = calculatePower(holdingTime, time);

  if (reachedDistance > distance) {
    possibleHoldingTimes++;
  }
}

console.log("result2", possibleHoldingTimes);
