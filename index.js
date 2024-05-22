const express = require("express");
const bt=require("battaglia.js")
const fs = require("fs");
const http = require("http");
const path = require("path");
const app = express();
const mysql = require("mysql2");
const conf = require("./conf.js");
const connection = mysql.createConnection(conf);
const bodyParser = require("body-parser");


//server
const server = http.createServer(app);
server.listen(80, () => {
  console.log("Server running");
});


app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(
  "/",
  express.static(path.join(__dirname, "public")),
);

const executeQuery = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, result) {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

//websocket
const { Server } = require("socket.io");
const io = new Server(server);
let partita={room:"", users:[]}

io.on("connection", (socket) => {
  console.log("a user connected");

  // Unisciti a una room specifica
  socket.on("join room", () => {
    console.log(partita)
    if (partita.users.length < 2) {
      socket.join("partita");
      partita.room="partita"
      partita.users.push(socket.id)
      if (partita.users.length===2){
        
        for (let i = 0; i < 10; i++) {
          mio.push([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
      }
        creazioneGrigliaNavi(mio);
        io.to(partita.room).emit("start game")
      }else{
        io.to(socket.id).emit("solo un giocatore connesso")
      }
    }
    else{
      io.to(socket.id).emit("partita già in corso")
    }
    console.log(`User joined room: ${partita}`);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

/*
const io = socketio(server);

const connessioni = [null, null]
io.on('connection', socket =>{
  //console.log("Nuova connessione WS");
  //trovare nuove connessioni
  let indiceGiocatori = -1;
  for (const i in connessioni) {
    if(connessioni[i] === null){
      indiceGiocatori = i
      break
    }
  }

  //ingorare la terza connessione
  if (indiceGiocatori === -1) return
  //dire ai giocatori che numero sono
  socket.emit("giocatore-numero", indiceGiocatori);
  console.log(`Giocatore ${indiceGiocatori} si è connesso`);

 
  
  connessioni[indiceGiocatori] = false;
  //dire che giocatore si è connesso
  socket.broadcast.emit('giocatore-connesso', indiceGiocatori);
  //disconnessioni
  socket.on('disconnesso', () =>{
    console.log(`Giocatore ${indiceGiocatori} disconnesso`);
    connessioni[indiceGiocatori] = null;
    //che giocatore si è disconnesso
    socket.broadcast.emit('giocatore-connesso', indiceGiocatori);
  })
});*/

//Login
const checkLogin = (user, pass) => {
  const template = `
  SELECT * FROM Utenti
  WHERE username = '%username' 
  AND password = '%password'
  `;
  const sql = template.replace("%username", user).replace("%password", pass);
  console.log(sql);
  return executeQuery(sql);
};

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  checkLogin(username, password).then((result) => {
    console.log(result);
    if (result.length > 0) {
      res.json({ result: "Ok" });
    } else {
      //login non valida
      res.status(401); //errore 401
      res.json({ result: "Unauthorized" });
    };
  });
});

//registrazione
const checkReg = (user, pass) => {
  const template = `
  INSERT INTO Utenti (username, password)
  VALUES ('%username', '%password');
  `;
  const sql = template.replace("%username", user).replace("%password", pass);
  console.log(sql);
  return executeQuery(sql);
};

app.post("/registrazione", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username, password);
  checkReg(username, password).then((result) => {
    checkLogin(username, password).then((result) => {
      console.log(result);
      if (result.length > 0) {
        res.json({ result: "Ok" });
      } else {
        //login non valida
        res.status(401); //errore 401
        res.json({ result: "Unauthorized" });
      }
    });
    /*console.log(result);
    if (result.length > 0) {
      res.json({ result: "Ok" });
    } else {
      //errore registrazione
      res.status(401); //errore 401
      res.json({ result: "Error" });
    }*/
  });
});


