const express = require("express");
const logger = require("./util/default.logger");
const app = express();

// const config = require("../db_connection");
// var conn = config.con;

const BusinessPartner = require("./routes/BusinessPartner.route");
const MainDataset = require("./routes/MainDataset.route");
const user = require("./routes/user.route");
const { Server } = require("socket.io");
// running port
const PORT = process.env.PORT || 4100;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
  next();
});

//app.use(express.json());
app.use(express.json({ limit: '1500mb' }));
app.use(express.urlencoded({ limit: '1500mb' }));

//businesspartnermaster
app.use("/api/Excelupload", BusinessPartner);


app.use("/api/MainDataset", MainDataset);
app.use("/api/user", user);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("API Not Found");
  err.httpStatusCode = 404;
  return next(err);
});



// error handler
app.use((err, req, res, next) => {
  const status = err.httpStatusCode || 500;
  const message = err.message;

  res.status(status).json({ message: message });
});

app.listen(PORT, () => {
  console.log(`server listen in ${PORT}`);
  logger.info(`server listen in ${PORT}`);




});

const { MasterSelectdt } = require("./controllers/MainDataset.controller");
const httpServer = require('http').createServer(express);
const io = require('socket.io')(httpServer, {
  cors: true,
  origins: ["*"]
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on('gameUpdate', ({ gameId, words }) => {
    console.log('gameUpdate')
    io.to(gameId).emit(gameId, words);
  })

  socket.on('startGame', ({ gameId }) => {
    
      io.to(gameId).emit('startGame', "words");
      console.log("Someone is starting a game");
  
  })

  socket.on('joinGame', ({ gameId }) => {
    socket.join(gameId);
    console.log("a player joined the room " + gameId);
    socket.to(gameId).emit('joinGame', "A player joined the game!");
})

})
const PORT1 = 3000;
httpServer.listen(PORT1, () => console.log('Server is running on port ' + PORT1));