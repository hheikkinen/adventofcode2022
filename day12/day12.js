function main() {
  const fs = require("fs");

  const lines = fs.readFileSync("input.txt").toString().split("\n");
  let grid = lines.map(s => s.split(""))
  let startPos = [0, 0];
  let targetPos = [0, 0];

  //Get start and target positions
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "S") {
        startPos = [y, x];
        grid[y][x] = "a" //Replace with min valued char
      }

      if (grid[y][x] === "E") {
        targetPos = [y, x];
        grid[y][x] = "z" //Replace with max valued char
      }
    }
  }

  console.log("STEPS:", bfs(grid, startPos, targetPos));

  //PART 2
  const startPosArr = [];

  //Get start and target positions
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === "S") {
        startPosArr.push([y, x]);
        grid[y][x] = "a"
      }

      if (grid[y][x] === "a") {
        startPosArr.push([y, x]);
      }

      if (grid[y][x] === "E") {
        targetPos = [y, x];
        grid[y][x] = "z"
      }
    }
  }

  const pathArr = [];

  for(const startPos of startPosArr) {
    pathArr.push(bfs(grid, startPos, targetPos));
  }

  console.log("STEPS 2:", Math.min(...pathArr));
}

//Breadth-First Search
function bfs(grid, startPos, targetPos) {
  const queue = [[startPos, 0]];
  const visited = new Set([`${startPos[0]} ${startPos[1]}`]);
  let res = Number.POSITIVE_INFINITY;

  //Up, down, left, right
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  while (queue.length) {
    const [pos, steps] = queue.shift();

    if (`${pos[0]} ${pos[1]}` === `${targetPos[0]} ${targetPos[1]}`) {
      res = steps;
      break;
    }

    //Check every direction per grid pos
    directions.map(([row, col]) => [pos[0] + row, pos[1] + col])
      .filter(([row, col]) => (row >= 0 && row < grid.length) && (col >= 0 && col < grid[0].length))  //Pos is in grid
      .filter(([row, col]) => grid[row][col].charCodeAt(0) - grid[pos[0]][pos[1]].charCodeAt(0) <= 1) //Pos height is max 1 higher than current pos
      .filter(pos => !visited.has(`${pos[0]} ${pos[1]}`))
      .forEach(pos => {
        visited.add(`${pos[0]} ${pos[1]}`);
        queue.push([pos, steps + 1]);
      })
  }

  return res;
}

main();