const path = require("path");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3004;

const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  //Send a random number every second
  setInterval(() => {
    socket.emit("number", parseInt(Math.random() * 10));
  }, 1000);
  
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// connect db (no seeding here)
mongoose.connect("mongodb://localhost:27017/myprojectDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// routes
app.use("/api/projects", require("./routes/projects"));

// health
app.get("/health", (_req, res) => res.json({ ok: true }));

// app.listen(PORT, () => console.log(`App running at http://localhost:${PORT}`));

http.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
