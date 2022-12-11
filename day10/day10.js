function main() {
  const fs = require("fs");

  let lines = fs.readFileSync("input.txt").toString().split(/\r?\n/);

  let X = 1;
  let exec = 1;
  let currInstrExec = 1;
  let total = 0;

  while (lines.length > 0) {
    if (currInstrExec === 3) {
      const val = Number(lines[0].split(" ")[1]);
      X += val;
      currInstrExec = 1;
      lines.shift();
    }

    if (lines[0] === "noop") {
      lines.shift();
    } else {
      if (currInstrExec < 3) {
        currInstrExec++;
      }
    }

    if (exec % 40 === 20) {
      total += exec * X;

      if (exec === 220) {
        break;
      }
    }

    exec++;
  }

  console.log("TOTAL:", total);

  //PART 2
  lines = fs.readFileSync("input.txt").toString().split(/\r?\n/);
  let crt = new Array(6).fill(0).map(() => new Array(40).fill(" "));

  X = 1;
  exec = 1;
  currInstrExec = 1;
  let crtY = 0;
  let crtX = 0;

  while (lines.length > 0) {
    crtX = (exec - 1) % 40;
    crtY = Math.floor((exec - 1) / 40);

    if (currInstrExec === 3) {
      const val = Number(lines[0].split(" ")[1]);
      X += val;
      currInstrExec = 1;

      lines.shift();
    }

    if (lines[0] === "noop") {
      lines.shift();
    } else {
      if (currInstrExec < 3) {
        currInstrExec++;
      }
    }


    if (Math.abs(crtX - X) < 2) {
      crt[crtY][crtX] = "#";
    } else {
      crt[crtY][crtX] = ".";
    }

    crtX++;
    exec++;

    if (exec === 240) {
      break;
    }
  }
  console.log(crt.map((line) => line.join("")).join("\n"))
}

main();