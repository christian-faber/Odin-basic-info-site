const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = "." + req.url + ".html";

  // Set default to index.html if no specific page is requested
  if (filePath === "./.html") {
    filePath = "./index.html";
  }

  // Read the requested file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      fs.readFile("./404.html", (err, content) => {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content, "utf-8");
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(content, "utf-8");
    }
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
