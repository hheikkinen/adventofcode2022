function main() {
  const fs = require("fs");
  let containsCount = 0;

  const lines = fs.readFileSync("input.txt", "utf-8");
  lines.split(/\r?\n/).forEach(line => {
     const pairs = parseLine(line)

    if(arrContainsCompare(pairs[0], pairs[1])) {
      containsCount++;
     }
  });

  console.log("CONTAINS", containsCount);

  //PART 2
  let overlapCount = 0;

  lines.split(/\r?\n/).forEach(line => {
    const pairs = parseLine(line)
    const pair1Arr = pairToArray(pairs[0][0], pairs[0][1]);
    const pair2Arr = pairToArray(pairs[1][0], pairs[1][1]);

    for(let i = pair1Arr[0]; i <= pair1Arr[pair1Arr.length - 1]; i++) {
      if(pair2Arr.includes(i)) {
        overlapCount++;
        break;
      }
    }
  });

  console.log("OVERLAPS", overlapCount);
}

function parseLine(line) {
  const pairs = line.split(",");

  const { pair1Start, pair1End } = { pair1Start: Number(pairs[0].split("-")[0]), pair1End: Number(pairs[0].split("-")[1]) };
  const { pair2Start, pair2End } = { pair2Start: Number(pairs[1].split("-")[0]), pair2End: Number(pairs[1].split("-")[1]) };

  return [[pair1Start, pair1End], [pair2Start, pair2End]];
}

function arrContainsCompare(arr1, arr2) {
  return (arr1[0] >= arr2[0] && arr1[1] <= arr2[1]) || (arr2[0] >= arr1[0] && arr2[1] <= arr1[1]);
}

function pairToArray(start, end) {
  let arr = [];

  for(let i = start; i <= end; i++) {
    arr.push(i)
  }

  return arr;
}

main();