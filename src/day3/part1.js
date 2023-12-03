import { readFile } from "../utils.js";

const input = readFile(3, 1);
// const input = `467..114..
// ...*......
// ..35..633.
// ......#...
// 617*......
// .....+.58.
// ..592.....
// ......755.
// ...$.*....
// .664.598..`;

function isNumber(char) {
  return !isNaN(parseInt(char));
}

let lines = input.split("\n").map((line) => line.trim());
let result1 = 0;

function findNearbySymbol(startIndex, endIndex, lineIndex) {
  // get lines with index - 1 and index + 1
  var nearbyLines = [lines[lineIndex]];
  if (lines[lineIndex - 1]) {
    nearbyLines.push(lines[lineIndex - 1]);
  }
  if (lines[lineIndex + 1]) {
    nearbyLines.push(lines[lineIndex + 1]);
  }

  for (let nearbyLine of nearbyLines) {
    var nearbyParts = nearbyLine
      .split("")
      .slice(
        Math.max(0, startIndex - 1),
        Math.min(endIndex + 2, nearbyLine.length)
      );

    // check if any part is not a dot and a number
    for (let nearbyPart of nearbyParts) {
      if (nearbyPart != "." && !isNumber(nearbyPart)) {
        return nearbyPart;
      }
    }
  }

  return null;
}

for (let [lineIndex, line] of lines.entries()) {
  let chars = line.split("");

  var buildingNumberStartIndex = null;
  var buildingNumberEndIndex = null;
  var buildingNumber = null;
  for (let [charIndex, char] of chars.entries()) {
    // check if char is a number
    if (isNumber(char)) {
      if (buildingNumber == null) {
        buildingNumber = char.toString();
        buildingNumberStartIndex = charIndex;
        continue;
      }

      buildingNumber += char.toString();
      //check if it is the last char
      if (charIndex != chars.length - 1) {
        continue;
      }
    }

    if (buildingNumber != null) {
      buildingNumberEndIndex = charIndex - 1;
      let symbol = findNearbySymbol(
        buildingNumberStartIndex,
        buildingNumberEndIndex,
        lineIndex
      );
      if (symbol != null) {
        result1 += parseInt(buildingNumber);
      }
      buildingNumber = null;
      continue;
    }
  }
}
console.log("result1", result1);

function findNearbyNumbers(lineIndex, charIndex) {
  var nearbyLines = [];
  if (lines[lineIndex - 1]) {
    nearbyLines.push(lines[lineIndex - 1]);
  }
  nearbyLines.push(lines[lineIndex]);
  if (lines[lineIndex + 1]) {
    nearbyLines.push(lines[lineIndex + 1]);
  }

  var nearbyNumbers = [];

  for (let [nearbyLineIndex, nearbyLine] of nearbyLines.entries()) {
    var nearbyParts = nearbyLine
      .split("")
      .slice(
        Math.max(0, charIndex - 1),
        Math.min(charIndex + 2, nearbyLine.length)
      );

    // check if any part is not a dot and a number
    for (let [relativeIndex, nearbyPart] of nearbyParts.entries()) {
      let nearbyCharIndex = charIndex - 1 + relativeIndex;
      if (isNumber(nearbyPart)) {
        // nearbyCharIndex is a index where a single digit of a number is, find the rest of the number in the same line
        let nearbyNumber = nearbyPart;
        let nearbyNumberStartIndex = nearbyCharIndex;
        let nearbyNumberEndIndex = nearbyCharIndex;
        // check left
        for (let i = nearbyCharIndex - 1; i >= 0; i--) {
          let char = nearbyLine[i];
          if (isNumber(char)) {
            nearbyNumber = char.toString() + nearbyNumber.toString();
            nearbyNumberStartIndex = i;
          } else {
            break;
          }
        }

        // check right
        for (let i = nearbyCharIndex + 1; i < nearbyLine.length; i++) {
          let char = nearbyLine[i];
          if (isNumber(char)) {
            nearbyNumber += char.toString();
            nearbyNumberEndIndex = i;
          } else {
            break;
          }
        }

        // check if a number with same index already exists in nearbyNumbers
        if (
          nearbyNumbers.find(
            (item) =>
              item.startIndex == nearbyNumberStartIndex &&
              item.endIndex == nearbyNumberEndIndex &&
              item.lineIndex == nearbyLineIndex
          )
        )
          continue;

        nearbyNumbers.push({
          number: nearbyNumber,
          startIndex: nearbyNumberStartIndex,
          endIndex: nearbyNumberEndIndex,
          lineIndex: nearbyLineIndex,
        });
      }
    }
  }

  return nearbyNumbers;
}

let result2 = 0;
for (let [lineIndex, line] of lines.entries()) {
  let chars = line.split("");

  for (let [charIndex, char] of chars.entries()) {
    if (char != "*") continue;

    let nearbyNumbers = findNearbyNumbers(lineIndex, charIndex);

    if (nearbyNumbers.length != 2) continue;

    const sum = nearbyNumbers
      .map((item) => parseInt(item.number))
      .reduce((a, b) => a * b);

    result2 += sum;
  }
}

console.log("result2", result2);
