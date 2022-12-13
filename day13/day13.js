function main() {
  const fs = require("fs");

  const lines = fs.readFileSync("input.txt").toString().split(/\r?\n/);
  let pairs = [];

  let ind = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i]) {
      if (!pairs[ind]) {
        pairs[ind] = [];
      }
      pairs[ind].push(JSON.parse(lines[i]));
    } else {
      ind++;
    }
  }

  const arr = pairs.map((pair, index) => {
    return { index: index + 1, val: compare(pair[0], pair[1]) <= 0 };  //Order is correct if returned value is <= 0
  });

  console.log("PAIR SUM:", arr.reduce((acc, curr) => acc + (curr.val ? curr.index : 0), 0));

  //PART 2
  let packets = lines.filter(line => line).map(line => JSON.parse(line));
  packets.push([[2]], [[6]]);

  packets = packets.sort((a, b) => compare(a, b)).map(p => p.toString()); //Stringify to find indexes
  const dec = (packets.findIndex(p => p === [[2]].toString()) + 1 ) * (packets.findIndex(p => p === [[6]].toString()) + 1);

  console.log("DECODER:", dec);
}

function compare(left, right) {
  if (!Array.isArray(left) && !Array.isArray(right)) {
    return left - right;
  } else {
    if (!Array.isArray(left)) {
      left = [left]
    }
    if (!Array.isArray(right)) {
      right = [right]
    }

    for (let i = 0; i < Math.min(left.length, right.length); i++) {
      const res = compare(left[i], right[i]);
      if (res !== 0) {
        return res;
      }
    }
    return left.length - right.length;
  }
}

main();