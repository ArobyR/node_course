const readline = require("readline");

const readLine = () => {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.on("line", (line) => {
      process.stdin.unref();
      resolve(line);
    });
  });
};

module.exports = {
  readLine,
};
