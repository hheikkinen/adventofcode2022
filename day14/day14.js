function main() {
  const fs = require("fs");

  const lines = fs.readFileSync("input.txt").toString().split(/\r?\n/);
  let instr = lines.map(line => {
    return line.split(" -> ").map(i => i.split(",").map(Number));
  });

  let maxY = 0;
  let maxX = 0;
  let minX = 9999;

  instr.forEach(row => {
    row.forEach(point => {
      const [x, y] = point;
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
      minX = Math.min(minX, x)
    });
  });

  const cave = createCave(instr, maxX, maxY);

  //Drop sand
  let sandCount = 0;
  let sY = 0;
  let sX = 500;

  while (true) {
    if ((sY + 1) > maxY) {
      cave[sY][sX] = "~";
      break;
    }

    if (cave[sY + 1][sX] === "#" || cave[sY + 1][sX] === "o") {
      if (cave[sY + 1][sX - 1] === ".") { //Check diagonal left
        sY++;
        sX--;
      } else if (cave[sY + 1][sX + 1] === ".") { //Check diagonal right
        sY++;
        sX++;
      } else {
        //Sand comes to rest
        cave[sY][sX] = "o";
        sandCount++;

        //New sand
        sY = 0;
        sX = 500;
      }
    } else {
      sY++;
    }
  }

  //Exit point
  cave[sY][sX] = "~";

  //Visual representation
  //console.log(cave.map((c) => c.join("").slice(minX, maxX + 1)).join("\n"))
  console.log("SAND COUNT:", sandCount)

  //PART 2
  maxY += 1;
  maxX *= 2;
  const cave2 = createCave(instr, maxX, maxY);

  //Drop sand
  sandCount = 0;
  sY = 0;
  sX = 500;

  while (true) {
    //Sand on the floor
    if (sY === maxY) {
      cave2[sY][sX] = "o";
      sandCount++;

      sY = 0;
      sX = 500;
      continue;
    }

    if (cave2[sY + 1][sX] === "#" || cave2[sY + 1][sX] === "o") {
      if (cave2[sY + 1][sX - 1] === ".") {
        sY++;
        sX--;
      } else if (cave2[sY + 1][sX + 1] === ".") {
        sY++;
        sX++;
      } else {
        cave2[sY][sX] = "o";
        sandCount++;

        if (sY === 0 && sX === 500) {
          break;
        }

        sY = 0;
        sX = 500;
      }
    } else {
      sY++;
    }
  }

  console.log("SAND COUNT 2:", sandCount)
}

function createCave(instr, maxX, maxY) {
  const cave = new Array(maxY + 1).fill(0).map(() => new Array(maxX + 1).fill("."));

  //Sand source
  cave[0][500] = "+";

  for (let i = 0; i < instr.length; i++) {
    for (let p = 0; p < instr[i].length; p++) {
      const currPoint = {x: instr[i][p][0], y: instr[i][p][1]}

      if ((instr[i][p + 1])) {
        const targetPoint = {x: instr[i][p + 1][0], y: instr[i][p + 1][1]}

        //Fill in rocks
        while (currPoint.x !== targetPoint.x || currPoint.y !== targetPoint.y) {
          cave[currPoint.y][currPoint.x] = "#";

          if (currPoint.x > targetPoint.x) {
            currPoint.x -= 1;
          } else if (currPoint.x < targetPoint.x) {
            currPoint.x += 1;
          } else if (currPoint.y > targetPoint.y) {
            currPoint.y -= 1;
          } else if (currPoint.y < targetPoint.y) {
            currPoint.y += 1;
          }
        }
      }
      cave[currPoint.y][currPoint.x] = "#";
    }
  }

  return cave;
}

main();