function main() {
  const fs = require("fs");

  const lines = fs.readFileSync("input.txt").toString().split(/\r?\n/);

  let instr = lines.map(line => {
    return line.split("->").map(i => i.trim()).map(i => i.split(",").map(i => Number(i)));
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

  const cave = new Array(maxY + 1).fill(0).map(() => new Array(maxX - minX + 1).fill("."));

  //Sand source
  cave[0][(500 - minX)] = "+";

  instr.forEach(row => {
    for(let i = 0; i < row.length; i++) {
      const [startX, startY] = row[i];
      if(row[i + 1]) {
        const [endX, endY] = row[i + 1];
        let currX = startX;
        let currY = startY;

        //Fill in rocks
        if(startX > endX) {
          while (currX >= endX) {
            cave[currY][currX - minX] = "#";
            currX--;
          }
        } else if (startX < endX) {
          while (currX <= endX) {
            cave[currY][currX - minX] = "#";
            currX++;
          }
        } else if (startY > endY) {
          while (currY > endY) {
            cave[currY][currX - minX] = "#";
            currY--;
          }
        } else if (startY < endY) {
          while (currY < endY) {
            cave[currY][currX - minX] = "#";
            currY++;
          }
        }
      }
    }
  });

  //Drop sand
  let sandCount = 0;
  let sY = 0;
  let sX = 500 - minX;

  while (true) {
    if((sY + 1) > maxY) {
      cave[sY][sX] = "~";
      break;
    }

    if(sX > (maxX - minX + 1) || sX <= 0) {
      cave[sY][sX] = "~";
      break;
    }

    if(cave[sY + 1][sX] === "#" || cave[sY + 1][sX] === "o") {
      if(cave[sY + 1][sX - 1] === ".") { //Check diagonal left
        sY++;
        sX--;
      } else if(cave[sY + 1][sX + 1] === ".") { //Check diagonal right
        sY++;
        sX++;
      } else {
        //Sand comes to rest
        cave[sY][sX] = "o";
        sandCount++;

        console.log("REST AT " + sY + " " + sX)
        //console.log(cave.map((c) => c.join("")).join("\n"))

        //New sand
        sY = 0;
        sX = 500 - minX;
      }
    } else {
      sY++;
    }
  }

  //Exit point
  cave[sY][sX] = "~";

  console.log(cave.map((c) => c.join("")).join("\n"))
  console.log("SAND:", sandCount)

  //692 too low
}

main();