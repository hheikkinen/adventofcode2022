function main() {
  const fs = require("fs");

  const lines = fs.readFileSync("input.txt").toString();
  let currHeadPos = { x: 0, y: 0 };
  let currTailPos = { x: 0, y: 0 };
  let visited = [];

  lines.split("\n").forEach(line => {
    const [dir, steps] = line.split(" ");
    let headStepsTaken = 0;

    switch (dir) {
      case "U":
        while (headStepsTaken < steps) {
          currHeadPos.y--;
          headStepsTaken++;

          currTailPos = followHead(currHeadPos, currTailPos);
          if (!visited.includes(`${currTailPos.x},${currTailPos.y}`)) {
            visited.push(`${currTailPos.x},${currTailPos.y}`);
          }
        }

        break;
      case "D":
        while (headStepsTaken < steps) {
          currHeadPos.y++;
          headStepsTaken++;

          currTailPos = followHead(currHeadPos, currTailPos);
          if (!visited.includes(`${currTailPos.x},${currTailPos.y}`)) {
            visited.push(`${currTailPos.x},${currTailPos.y}`);
          }
        }

        break;
      case "L":
        while (headStepsTaken < steps) {
          currHeadPos.x--;
          headStepsTaken++;

          currTailPos = followHead(currHeadPos, currTailPos);
          if (!visited.includes(`${currTailPos.x},${currTailPos.y}`)) {
            visited.push(`${currTailPos.x},${currTailPos.y}`);
          }
        }

        break;
      case "R":
        while (headStepsTaken < steps) {
          currHeadPos.x++;
          headStepsTaken++;

          currTailPos = followHead(currHeadPos, currTailPos);
          if (!visited.includes(`${currTailPos.x},${currTailPos.y}`)) {
            visited.push(`${currTailPos.x},${currTailPos.y}`);
          }
        }

        break;
    }
  });

  console.log("VISITED:", visited.length);

  //PART 2
  let knots = new Array(10).fill(0).map(() => {
    return { x: 0, y: 0 }
  });
  visited = [];

  lines.split("\n").forEach(line => {
    const [dir, steps] = line.split(" ");
    let headStepsTaken = 0;

    switch (dir) {
      case "U":
        while (headStepsTaken < steps) {
          knots[0].y--;
          headStepsTaken++;

          let res = moveTail(knots, visited);
          knots = res.knots;
          visited = res.visited;
        }
        break;
      case "D":
        while (headStepsTaken < steps) {
          knots[0].y++;
          headStepsTaken++;

          let res = moveTail(knots, visited);
          knots = res.knots;
          visited = res.visited;
        }
        break;
      case "L":
        while (headStepsTaken < steps) {
          knots[0].x--;
          headStepsTaken++;

          let res = moveTail(knots, visited);
          knots = res.knots;
          visited = res.visited;
        }
        break;
      case "R":
        while (headStepsTaken < steps) {
          knots[0].x++;
          headStepsTaken++;

          let res = moveTail(knots, visited);
          knots = res.knots;
          visited = res.visited;
        }
        break;
    }
  });

  console.log("TAIL VISITED:", visited.length);
}

function followHead(headPos, tailPos) {

  let newPos = {...tailPos};

  //Manhattan distance
  const dist = Math.max(Math.abs(headPos.x - tailPos.x), Math.abs(headPos.y - tailPos.y));

  if (dist > 1) {
    const dirX = headPos.x - tailPos.x;
    const dirY = headPos.y - tailPos.y;
    newPos.x += Math.abs(dirX) === 2 ? dirX / 2 : dirX;
    newPos.y += Math.abs(dirY) === 2 ? dirY / 2 : dirY;
  }

  return newPos;
}

function moveTail(knots, visited) {
  for (let t = 1; t < knots.length; t++) {
    knots[t] = followHead(knots[t - 1], knots[t]);

    if (t === knots.length - 1) {
      if (!visited.includes(`${knots[t].x},${knots[t].y}`)) {
        visited.push(`${knots[t].x},${knots[t].y}`);
      }
    }
  }

  return {knots, visited};
}

main();