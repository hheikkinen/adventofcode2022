function main() {
  const fs = require("fs");

  let lines = fs.readFileSync("input.txt").toString();
  const { stackPositions, startStacksEndIndex } = getStackStartPositions(lines);
  let startingStacks = getStartingStacks(stackPositions, startStacksEndIndex, lines);

  const stacks = moveCrates(startingStacks, lines)
  console.log("STACKS", stacks.map(s => s[0]).join(""))

  //PART 2
  startingStacks = getStartingStacks(stackPositions, startStacksEndIndex, lines);

  const stacks2 = moveCrates(startingStacks, lines, true)
  console.log("STACKS2", stacks2.map(s => s[0]).join(""))
}

function getStackStartPositions(lines) {
  let startStacksEndIndex = 0;
  const stackPositions = [];

  lines.split("\n").forEach((line, index) => {
    if (line.charAt(1) === "1") {
      for (let c = 0; c < line.length; c++) {
        if (Number(line.charAt(c))) {
          stackPositions.push(c);
        }
      }

      startStacksEndIndex = index;
    }
  });

  return {stackPositions, startStacksEndIndex};
}

function getStartingStacks(stackPositions, startStacksEndIndex, lines) {
  const startingStacks = [];
  lines.split("\n").forEach((line, index) => {
    if (index < startStacksEndIndex) {
      stackPositions.forEach((pos, i) => {
        if (!startingStacks[i]) {
          startingStacks[i] = [];
        }

        if (line.charAt(pos) !== " " && line.charAt(pos) !== "") {
          startingStacks[i].push(line.charAt(pos));
        }
      });
    }
  });

  return startingStacks;
}

function moveCrates(stacks, lines, keepOrder = false) {
  lines.split("\n").forEach(line => {
    if (line.includes("move")) {
      const {count, from, to} = readMoveInstruction(line);

      let fromStack = stacks[Number(from) - 1];
      let toStack = stacks[Number(to) - 1];

      let copied;
      if (keepOrder) {
        copied = fromStack.slice(0, count).reverse();
      } else {
        copied = fromStack.slice(0, count);
      }

      for (let i = 0; i < count; i++) {
        fromStack.shift();
        toStack.unshift(copied[i]);
      }

      stacks[Number(from) - 1] = fromStack;
      stacks[Number(to) - 1] = toStack;
    }
  });

  return stacks;
}

function readMoveInstruction(line) {
  const regex = /move (\d+) from (\w+) to (\w+)/;
  const match = line.match(regex);
  const [_, count, from, to] = match;
  return {count, from, to};
}

main();