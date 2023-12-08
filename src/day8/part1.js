import { readFile } from "../utils.js";

const input = readFile(8, 1);

const exampleInput = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
`;

const example = input;

const ways = example
  .split("\n")
  .slice(2)
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .map((line) => {
    let [start, map] = line.split(" = ");
    let [left, right] = map.split(", ");

    left = left.replace("(", "").replace(")", "");
    right = right.replace("(", "").replace(")", "");

    return {
      start,
      left,
      right,
    };
  })
  .reduce((acc, curr) => {
    acc[curr.start] = {
      left: curr.left,
      right: curr.right,
    };
    return acc;
  }, {});

const instructions = example.split("\n")[0].split("");
// {
//   let currentPos = "AAA";
//   let steps = 0;
//   while (currentPos != "ZZZ") {
//     for (let i = 0; i < instructions.length; i++) {
//       let instruction = instructions[i];

//       if (instruction === "R") {
//         currentPos = ways[currentPos].right;
//       } else if (instruction === "L") {
//         currentPos = ways[currentPos].left;
//       }
//       steps++;
//       if (currentPos === "ZZZ") {
//         break;
//       }
//     }
//   }

//   console.log("part1", steps);
// }

{
  let ghosts = Object.keys(ways)
    .filter((key) => key[2] === "A")
    .map((key) => {
      return {
        key,
        steps: 0,
        currentPos: key,
      };
    });
  while (!ghosts.every((ghost) => ghost.currentPos[2] == "Z")) {
    for (let i = 0; i < instructions.length; i++) {
      let instruction = instructions[i];

      for (let ghost of ghosts) {
        if (instruction === "R") {
          ghost.currentPos = ways[ghost.currentPos].right;
        } else if (instruction === "L") {
          ghost.currentPos = ways[ghost.currentPos].left;
        }
        ghost.steps++;
      }

      if (ghosts.every((ghost) => ghost.currentPos[2] == "Z")) {
        break;
      }
    }
  }

  console.log("part2", ghosts);
}
