function main() {
  const fs = require("fs");

  let currPath = "";
  let folders = [];
  let allPaths = [];

  const lines = fs.readFileSync("input.txt").toString();

  lines.split("\n").forEach(line => {
    const cmd = line.split(" ");

    //Keeps track of the current path
    if (cmd[0] === "$") {
      if (cmd[1] === "cd") {
        if (cmd[2] === "/") {
          currPath = "";
          allPaths.push("");
        } else if (cmd[2] === "..") {
          currPath = currPath.substring(0, currPath.lastIndexOf("/"));
        } else {
          currPath += "/" + cmd[2];
          allPaths.push(currPath);
        }
      }
    } else {
      //Count size of the current folder
      if (cmd[0] !== "dir") {
        const index = folders.findIndex(f => f.path === currPath);

        if (index === -1) {
          folders.push({ path: currPath, size: Number(cmd[0]) });
        } else {
          folders[index].size += Number(cmd[0]);
        }
      }
    }
  });

  const final = [];

  //Calculate total size of each full directory path
  for (const path of allPaths) {
    const totalSize = folders.reduce((acc, curr) => {
      if (curr.path.includes(path)) {
        acc += curr.size;
      }

      return acc;
    }, 0);

    final.push({ dir: path, size: totalSize });
  }

  console.log("TOTAL SIZE:", final.filter(f => f.size <= 100000).reduce((acc, curr) => acc + curr.size, 0));

  //PART 2
  const unused = 70000000 - final[0].size;
  console.log("SMALLEST:", final.filter(f => f.size >= 30000000 - unused).sort((a, b) => a.size - b.size)[0].size);

}

main();