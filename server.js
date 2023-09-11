// J'importe la methode http de node.js
const http = require("http");

// J'importe la methode "app" que j'ai créé avec "express"
const app = require("./app");

// Une fonction qui vérifie si le PORT est bon -- Voir peut etre TS
const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

// Je défini ma variable PORT en vérifiant sa validation avec une fonction !
const port = normalizePort(process.env.PORT || "3000");

// Défini le PORT à "express"
app.set("port", port);

// Je ne sais pas trop !!!!!!!!!!!!
const errorHandler = (error) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port: " + port;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges.");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use.");
      process.exit(1);
      break;
    default:
      throw error;
  }
};

// Je crée mon serveur en mettant la methode "app" que j'ai créé avec "express"
const server = http.createServer(app);

// Je ne sais pas trop !!!!!!!!!!!!
server.on("error", errorHandler);
server.on("listening", () => {
  const address = server.address();
  const bind = typeof address === "string" ? "pipe " + address : "port " + port;
  console.log("Listening on " + bind);
});

// Je lance mon serveur
server.listen(port);
