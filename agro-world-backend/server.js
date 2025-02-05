/* Backend: Node.js with Express and Socket.io */

const express = require("express");
const mysql = require("mysql");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "stock_market",
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/stocks", (req, res) => {
  db.query("SELECT * FROM stocks", (err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
});

io.on("connection", socket => {
  console.log("New client connected");

  setInterval(() => {
    db.query("SELECT * FROM stocks", (err, results) => {
      if (!err) {
        socket.emit("stockUpdate", results);
      }
    });
  }, 3000);

  socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});
