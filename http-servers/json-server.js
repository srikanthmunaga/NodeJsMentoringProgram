import http from "http";
import product from "./../data/product.json";

http
  .createServer()
  .on("request", (req, res) => {
    res.writeHead(200, {
      "Content-Type": "application/json"
    });
    res.end(JSON.stringify(product));
  })
  .listen(3000, () => {
    "Running on port 3000 && json-server.js";
  });
