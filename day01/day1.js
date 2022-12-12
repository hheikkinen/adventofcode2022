function main() {
  const fs = require("fs");

  let numbers = [];
  let currentCount = 0;

  const lines = fs.readFileSync("input.txt").toString();
  lines.split("\n").forEach(line => {
    if (!isNaN(parseInt(line))) {
      currentCount += parseInt(line);
    } else {
      numbers.push(currentCount);
      currentCount = 0;
    }
  });

  console.log("MAX:", numbers.sort((a, b) => a - b)[0]);

  //PART 2
  const top3 = numbers.sort((a, b) => b - a).slice(0, 3)
  console.log("TOP 3:", top3.reduce((a, b) => a + b, 0));
}

main();