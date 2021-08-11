// const { mensaje } = require("./datos");

// Modulo os
// const { freemem } = require("os");
// mensaje("Hola mundo");
// mensaje(freemem());

// Modulo path
// const path = require("path")
// const objPath = path.parse(__filename)
// console.log(objPath)
// const directorio = objPath.dir;
// let arraydir = directorio.split(path.sep)
// console.log(arraydir)

// modulo fs
// const fs = require("fs")
// const archivos = fs.readdirSync("./")
// console.log(archivos)

// fs.readdir("./", (err, files) => {
//     if (err) console.log("Error", err)
//     else console.log("Files:", files)
// })

// modulo Events
// const EventEmitter = require("events");
// const emitter = new EventEmitter();

// registrar evento o listerner
// emitter.on("messageLoger", (arg) => {
//   console.log("Listener called...", arg);
// });

// llamar el evento
// emitter.emit("messageLoger", { id: 1, url: "http://github.com" });

// Modulo HTTP
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hola mundo");
  }

  if (req.url === "/api/products") {
    res.write(JSON.stringify({ products: ["mouse", "keyboard", "monitor"] }));
  }
  res.end(); // para finalizar la respuesta
});

server.on("connection", () => {
  console.log("Nueva conexion...");
});

server.listen(3000);

console.log("Servidor escuchando en el puerto 3000");
