function main() {
  const fs = require("fs");

  const input = fs.readFileSync("input.txt").toString();

  let arr = [];
  let charCount = 0;

  for(let i = 0; i < input.length; i++) {
    arr.unshift(input[i]);

    if(arr.length > 4) {
      arr.pop();
      if(!arr.some((element, index) => arr.indexOf(element) !== index)) {
        charCount = i + 1;
        break;
      }
    }
  }

  console.log("CHAR COUNT: " + charCount);

  //PART 2
  arr = [];

  for(let i = 0; i < input.length; i++) {
    arr.unshift(input[i]);

    if(arr.length > 14) {
      arr.pop();
      if(!arr.some((element, index) => arr.indexOf(element) !== index)) {
        charCount = i + 1;
        break;
      }
    }
  }

  console.log("CHAR COUNT 2: " + charCount);
}


main();