const POINTS = {
  X: 1, Y: 2, Z: 3
}

function main() {
  const fs = require("fs");

  let score = 0;
  let score2 = 0;

  const lines = fs.readFileSync("input.txt", "utf-8");
  lines.split(/\r?\n/).forEach(line =>  {
    const round = line.split(" ");
    const opponent = round[0];
    const me = round[1];

    score += calc(opponent, me);

    //PART 2
    score2 += calcStrat(opponent, me);

    console.log(opponent, me, calc(opponent, me));
  });

  console.log("TOTAL:", score);
  console.log("PART 2 TOTAL:", score2);
}

function calc(opponent, me) {
  switch (opponent) {
    case "A":
      switch (me) {
        case "X":
          return 3 + POINTS.X;  //Rock vs Rock
        case "Y":
          return 6 + POINTS.Y;  //Rock vs Paper
        case "Z":
          return POINTS.Z;  //Rock vs Scissors
      }
      break;
    case "B":
      switch (me) {
        case "X":
          return POINTS.X;  //Paper vs Rock
        case "Y":
          return 3 + POINTS.Y;  //Paper vs Paper
        case "Z":
          return 6 + POINTS.Z;  //Paper vs Scissors
      }
      break;
    case "C":
      switch (me) {
        case "X":
          return 6 + POINTS.X;  //Scissors vs Rock
        case "Y":
          return POINTS.Y;  //Scissors vs Paper
        case "Z":
          return 3 + POINTS.Z;  //Scissors vs Scissors
      }
      break;
  }
}

function calcStrat(opponent, me) {
  switch (opponent) {
    case "A":
      switch (me) {
        case "X":
          return POINTS.Z;
        case "Y":
          return 3 + POINTS.X;
        case "Z":
          return 6 + POINTS.Y;
      }
      break;
    case "B":
      switch (me) {
        case "X":
          return POINTS.X;
        case "Y":
          return 3 + POINTS.Y;
        case "Z":
          return 6 + POINTS.Z;
      }
      break;
    case "C":
      switch (me) {
        case "X":
          return POINTS.Y;
        case "Y":
          return 3 + POINTS.Z;
        case "Z":
          return 6 + POINTS.X;
      }
      break;
  }
}

main();