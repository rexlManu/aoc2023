import { readFile } from "../utils.js";

const input = readFile(5, 1);

const test = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const lines = input.split("\n").map((line) => line.trim());

const seeds = lines[0]
  .split(": ")[1]
  .split(" ")
  .map((seed) => parseInt(seed));

const relocations = {};

const relocationLines = lines.slice(2);

let currentMap = null;
let mapSourceList = {};
for (let line of relocationLines) {
  // break line
  if (line == "") {
    currentMap = null;

    continue;
  }

  if (line.endsWith("map:")) {
    currentMap = line.split(" ")[0];
    relocations[currentMap] = {};
    mapSourceList[currentMap] = [];

    continue;
  }

  if (currentMap == null) {
    continue;
  }

  let [destinationRangeStart, sourceRangeStart, length] = line
    .split(" ")
    .map((value) => parseInt(value));

  mapSourceList[currentMap].push({
    destinationRangeStart,
    sourceRangeStart,
    length,
  });
}

function findSource(map, source) {
  let sources = mapSourceList[map];
  if (!sources) {
    throw new Error(`Invalid map ${map}`);
  }

  for (let { sourceRangeStart, destinationRangeStart, length } of sources) {
    if (source < sourceRangeStart || source > sourceRangeStart + length - 1) {
      continue;
    }

    let relativeSource = source - sourceRangeStart;

    return destinationRangeStart + relativeSource;
  }

  return source;
}

function findDestination(map, source) {
  let sources = mapSourceList[map];
  if (!sources) {
    throw new Error(`Invalid map ${map}`);
  }

  for (let { sourceRangeStart, destinationRangeStart, length } of sources) {
    if (
      source < destinationRangeStart ||
      source > destinationRangeStart + length - 1
    ) {
      continue;
    }

    let relativeSource = source - destinationRangeStart;

    return sourceRangeStart + relativeSource;
  }

  return source;
}

// if (relocations["seed-to-soil"]["53"] != 55) {
//   throw new Error("Invalid relocation");
// }

const maps = {};
const mapsReverse = {};
Object.keys(relocations).forEach((map) => {
  let [source, destination] = map.split("-to-");
  maps[source] = destination;
  mapsReverse[destination] = source;
});

const START_MAP = Object.keys(maps)[0];

function nameToMap(sourceName, destName) {
  return `${sourceName}-to-${destName}`;
}

function findMapValue(seed, mapName) {
  let currentFindingSource = START_MAP;
  let value = seed;
  while (currentFindingSource != null) {
    let destination = maps[currentFindingSource];
    // found already latest possible map
    if (!destination) break;

    let destinationValue = findSource(
      nameToMap(currentFindingSource, destination),
      value
    );

    value = destinationValue;

    if (destination == mapName) {
      break;
    }

    currentFindingSource = destination;
  }

  return value;
}

function findMapValueReverse(seed) {
  let currentFindingSource = "location";
  let mapName = "seed";
  let value = seed;
  while (currentFindingSource != null) {
    let destination = mapsReverse[currentFindingSource];
    // found already latest possible map
    if (!destination) break;

    let destinationValue = findDestination(
      nameToMap(destination, currentFindingSource),
      value
    );

    value = destinationValue;
    currentFindingSource = destination;

    if (destination == mapName) {
      break;
    }
  }

  if (currentFindingSource != mapName) {
    return null;
  }

  return value;
}

{
  const results = seeds.map((seed) => findMapValue(seed, "location"));

  const lowestValue = Math.min(...results);
  console.log(lowestValue);
}

// let newSeeds = [];
// let lowestPossibleValue = Infinity;
// for (var seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
//   if (seedIndex % 2 != 0) continue;

//   let seedStart = seeds[seedIndex];
//   let length = seeds[seedIndex + 1];

//   console.log(seedStart, length);

//   for (let i = 0; i < length; i++) {
//     let seed = seedStart + i;
//     let locationValue = findMapValue(seed, "location");
//     if (i % 50000 == 0) {
//       console.log(`Processing ${Math.round((i / length) * 100)}%`);
//     }
//     if (locationValue < lowestPossibleValue) {
//       lowestPossibleValue = locationValue;
//     }
//   }
// }

// go from 1 to 100 million

function isSeed(value) {
  let newSeeds = [];
  for (var seedIndex = 0; seedIndex < seeds.length; seedIndex++) {
    if (seedIndex % 2 != 0) continue;
    let seedStart = seeds[seedIndex];
    let length = seeds[seedIndex + 1];

    if (value >= seedStart && value <= seedStart + length - 1) {
      return true;
    }
  }

  return false;
}

for (let i = 1; i < 100000000; i++) {
  let result = findMapValueReverse(i);

  let seedValue = isSeed(result);
  let percentageDone = Math.round((i / 100000000) * 100);
  if (i % 100000 == 0) console.log(`Processing ${percentageDone}%`);

  if (seedValue) {
    console.log(i, result);
    break;
  }
}
