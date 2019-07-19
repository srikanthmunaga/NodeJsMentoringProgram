import fs from "fs";
import http from "http";
import through2 from "through2";
import { UriConstants } from "../config/constants";

http
  .createServer()
  .on("request", (req, res) => {
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8"
    });
    fs.createReadStream(UriConstants)
      .pipe(
        through2(function write(buffer, encoding, next) {
          this.push(
            buffer.toString().replace("{message}", "Hello, I am html server")
          );
          next();
        })
      )
      .pipe(res);
  })
  .listen(3000, () => {
    "Running on port 3000 && html-server.js";
  });
