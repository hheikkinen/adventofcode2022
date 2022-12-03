const CHARS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

function main() {
  const fs = require("fs");
  let total = 0;

  const lines = fs.readFileSync("input.txt", "utf-8");
  lines.split(/\r?\n/).forEach(line => {
    total += parseLine(line);
  });

  console.log("TOTAL", total);

  //PART 2
  let groups = [];
  let currGroup = [];
  let groupsTotal = 0;

  lines.split(/\r?\n/).forEach((line, index) => {
    if(index > 0 && (index + 1) % 3 === 0) {  // Ugly
      currGroup.push(line);
      groups.push(currGroup);
      currGroup = [];
    } else {
      currGroup.push(line);
    }
  });

  groups.forEach(group => {
    groupsTotal += parseThreeLines(Array.from(group[0]), Array.from(group[1]), Array.from(group[2]));
  });

  console.log("GROUPS TOTAL", groupsTotal);
}

function parseLine(line) {
  const arr1 = Array.from(line.slice(0, line.length / 2));
  const arr2 = Array.from(line.slice(line.length / 2, line.length));

  let sum = 0;
  let matches = [];

  arr1.forEach((char) => {
    if(arr2.includes(char) && !matches.includes(char)) {
      sum += prioCalc(char);
      matches.push(char);
    }
  });

  return sum;
}

function parseThreeLines(line1, line2, line3) {
  let sum = 0;
  let matches = [];

  line1.forEach((char) => {
    if(line2.includes(char) && line3.includes(char) && !matches.includes(char)) {
      sum += prioCalc(char);
      matches.push(char)
    }
  });

  return sum;
}

function prioCalc(char) {
  if (char.toUpperCase() === char) {
    return CHARS.indexOf(char) + 1 + CHARS.length;
  } else {
    return CHARS.indexOf(char.toUpperCase()) + 1;
  }
}

main();