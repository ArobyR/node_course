const fs = require("fs");

const createSerie = (value) => {
  let fibo1 = 1;
  let fibo2 = 1;
  let serie = "";

  serie += `${fibo1}\t`;

  for (let i = 2; i <= value; i++) {
    serie += `${fibo2}\t`;
    fibo2 = fibo1 + fibo2;
    fibo1 = fibo2 - fibo1;
  }

  fs.writeFile("./fibonacci.txt", serie, (err) => {
    if (err) {
      console.log("Hubo un error..");
    } else {
      console.log("Todo ha salido bien");
    }
  });
};

module.exports = { createSerie };
