import { readFileSync } from "fs";
export function readFile(day, part) {
  const fileName = `./data/day${day}-part${part}`;

  return readFileSync(fileName, "utf8");
}
