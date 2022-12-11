function main() {
  const fs = require("fs");

  let lines = fs.readFileSync("input.txt").toString();
  let monkeys = parseMonkeys(lines);
  let round = 1;
  let inspected = {};

  while (round <= 20) {
    for (let m = 0; m < monkeys.length; m++) {
      for (let i = 0; i < monkeys[m].items.length; i++) {
        let item = monkeys[m].items[i];

        //Inspect
        const op = monkeys[m].op.replaceAll("old", item).split(" ");
        item = op[1] === "+" ? item + Number(op[2]) : item * Number(op[2]);

        //Decrease worry level
        item = Math.floor(item / 3);

        inspected[monkeys[m].id] = inspected[monkeys[m].id] + 1 || 1;

        //Test
        if (item % monkeys[m].test === 0) {
          monkeys[monkeys[m].onTrue].items.push(item);
        } else {
          monkeys[monkeys[m].onFalse].items.push(item);
        }
      }

      monkeys[m].items = [];
    }

    round++;
  }

  console.log("TOTAL:", Object.values(inspected).sort((a, b) => b - a)[0] * Object.values(inspected).sort((a, b) => b - a)[1]);

  //PART 2
  monkeys = parseMonkeys(lines);
  round = 1;
  inspected = {};

  const mod = monkeys.map(m => m.test).reduce((a, b) => a * b, 1);
  while (round <= 10000) {
    for (let m = 0; m < monkeys.length; m++) {
      for (let i = 0; i < monkeys[m].items.length; i++) {
        let item = monkeys[m].items[i];

        //Inspect
        const op = monkeys[m].op.replaceAll("old", item).split(" ");
        item = op[1] === "+" ? item + Number(op[2]) : item * Number(op[2]);

        //Modulo to keep numbers small
        item = item % mod;

        inspected[monkeys[m].id] = inspected[monkeys[m].id] + 1 || 1;

        //Test
        if (item % monkeys[m].test === 0) {
          monkeys[monkeys[m].onTrue].items.push(item);
        } else {
          monkeys[monkeys[m].onFalse].items.push(item);
        }
      }

      monkeys[m].items = [];
    }

    round++;
  }

  console.log("TOTAL:", Object.values(inspected).sort((a, b) => b - a)[0] * Object.values(inspected).sort((a, b) => b - a)[1]);
}

function parseMonkeys(lines) {
  return lines.split("\n\n").map((monkey, index) => {
    const data = monkey.split("\n");
    return {
      id: index,
      items: data[1].trim().split(":")[1].split(",").map(i => Number(i)),
      op: data[2].trim().split(":")[1].split("=")[1].trim(),
      test: Number(data[3].trim().split(" ")[3]),
      onTrue: Number(data[4].trim().match(/If true: throw to monkey (\d+)/)[1]),
      onFalse: Number(data[5].trim().match(/If false: throw to monkey (\d+)/)[1])
    }
  });
}

main();