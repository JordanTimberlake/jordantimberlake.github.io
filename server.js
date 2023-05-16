const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === "/" ? "home.html" : req.url);
  let extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".css":
      contentType = "text/css";
      break;
    case ".js":
      contentType = "text/javascript";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
    case ".wav":
      contentType = "audio/wav";
      break;
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == "ENOENT") {
        // File not found
        fs.readFile(path.join(__dirname, "404.html"), (err, content) => {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.end(content, "utf-8");
        });
      } else {
        // Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Successful response
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
