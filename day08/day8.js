function main() {
  const fs = require("fs");

  const lines = fs.readFileSync("input.txt").toString().split(/\r?\n/);
  let visibleCount = 0;

  lines.forEach((line, index) => {
    if (index !== 0 && index !== lines.length - 1) {
      const trees = line.split("");

      for (let t = 0; t < trees.length; t++) {
        const upArr = [];
        const downArr = [];
        const leftArr = [];
        const rightArr = [];

        if (t !== 0 && t !== trees.length - 1) {
          let updInd = index - 1;
          let downInd = index + 1;
          let leftInd = t - 1;
          let rightInd = t + 1;

          //Traverse up
          while (updInd >= 0) {
            const up = lines[updInd].split("")[t];
            if (up >= trees[t]) {
              upArr.push(up);
              break;
            }
            updInd--;
          }

          //Traverse down
          while (downInd < lines.length) {
            const down = lines[downInd].split("")[t];
            if (down >= trees[t]) {
              downArr.push(down);
              break;
            }
            downInd++;
          }

          //Traverse left
          while (leftInd >= 0) {
            const left = line.charAt(leftInd);
            if (left >= trees[t]) {
              leftArr.push(left);
              break;
            }
            leftInd--;
          }

          //Traverse right
          while (rightInd < trees.length) {
            const right = line.charAt(rightInd);
            if (right >= trees[t]) {
              rightArr.push(right);
              break;
            }
            rightInd++;
          }

          if (!leftArr.length || !rightArr.length || !upArr.length || !downArr.length) {
            visibleCount++;
          }
        } else {
          visibleCount++;
        }
      }
    } else {
      visibleCount += line.length;
    }
  });

  console.log("VISIBLE:", visibleCount);

  //PART 2
  let max = 0;

  lines.forEach((line, index) => {
    if (index !== 0 && index !== lines.length - 1) {
      const trees = line.split("");

      for (let t = 0; t < trees.length; t++) {
        const upArr = [];
        const downArr = [];
        const leftArr = [];
        const rightArr = [];

        if (t !== 0 && t !== trees.length - 1) {
          let updInd = index - 1;
          let downInd = index + 1;
          let leftInd = t - 1;
          let rightInd = t + 1;

          while (updInd >= 0) {
            const up = lines[updInd].split("")[t];
            upArr.push(up);
            if (up >= trees[t]) {
              break;
            }

            updInd--;
          }

          while (downInd < lines.length) {
            const down = lines[downInd].split("")[t];
            downArr.push(down);
            if (down >= trees[t]) {
              break;
            }
            downInd++;
          }

          while (leftInd >= 0) {
            const left = line.charAt(leftInd);
            leftArr.push(left);
            if (left >= trees[t]) {
              break;
            }
            leftInd--;
          }

          while (rightInd < trees.length) {
            const right = line.charAt(rightInd);
            rightArr.push(right);
            if (right >= trees[t]) {
              break;
            }
            rightInd++;
          }

          const score = leftArr.length * rightArr.length * upArr.length * downArr.length;
          if (score > max) {
            max = score;
          }
        }
      }
    }
  });

  console.log("MAX:", max);
}

main();