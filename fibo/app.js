const serie = require("./serie");
const { readLine } = require("./readLine");

// let pArgv = process.argv;
// let cant = pArgv[2].split("=")[1]
// let value = cant;

// const main = () => {
//   console.log(serie.createSerie);
// };

const main = () => {
  readLine().then((value) => serie.createSerie(value));
};
main();

// X.Y.Z X = Mayor version, Y = menor version, Z = version parches
// Y = modificaciones y nuevas features o conjuntos de bugs
// Cuando se hacen grandes cambios y esos cambios no son compatibles con la anterior
