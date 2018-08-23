import path from "path";
import fs from "fs";
import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import dotEnv from 'dotenv';


import App from "./App";

dotEnv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/assets", express.static("dist/assets"));

app.get("/*", (req, res) => {
  const app = ReactDOMServer.renderToString(<App />);
  const indexFile = path.resolve("dist/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    return res.send(data.replace('<div id="root"></div>', `<div id="root">${app}</div>`));
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${process.env.APP_CLIENT_ID} ${PORT}`);
});
