"use strict";
//_______________________ES5_____________________________________________
import bootstrap from './src/app.controller.js';
import DB from "./src/DB/connection.js";
//____________________________________________________________________
import express from "express";
const app = express();
const PORT = 3000;
//____________________________________________________________________
//____________________________________________________________________


bootstrap(app, express);

//_____________________-DATABASE CHECK CONNECTION__________________________
DB.connect((err) => {
  if (err) {
    console.error("error connecting to database");
  } else {
    console.log("Connected to database");
  }
});
//__________LISTEN TO SERVER____________________
const server = app.listen(PORT, "localhost", 511, () => {
  console.log(`Server is running on localhost ${PORT}`);
});
//__________IN CASE ERROR IN LISTENING_____________
server.on("error", (err) => {
  if (err.code == "EADDRINUSE") {
    //  PORT=3001
    console.error("server error..invalid port...port token");
    // setTimeout(() => {
    //   server.listen(port)
    // }, 1000);
    //or
    setTimeout(() => {
      server.close();
      server.listen(PORT);
    }, 1000);
  }
});
//_______________________________________________________________________






