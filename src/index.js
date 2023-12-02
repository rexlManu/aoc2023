const [, , day, part] = process.argv;

if (!day || !part) {
  throw new Error("Please provide a day and part");
}

const filePath = `./day${day}/part${part}.js`;
const solution = import(filePath);
