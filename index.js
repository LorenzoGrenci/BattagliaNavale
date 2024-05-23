const express = require("express");
const bt=require("./battaglia.js")
const fs = require("fs");
const http = require("http");
const path = require("path");
const app = express();
const mysql = require("mysql2");
const conf = require("./conf.js");
const connection = mysql.createConnection(conf);
const bodyParser = require("body-parser");
const { Server } = require("socket.io");
let partita={room:"", users:[], index:0}
let mio = [];
let players = [];


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
const io = new Server(server);


const resetmio=()=>{
  mio=[]
  for (let i =0; i<10 ; i++){
    mio.push([0,0,0,0,0,0,0,0,0,0])
  }
}
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
        partita.users.forEach(id=>{
          resetmio()
          let combinazione = bt.creaComp(mio)
          io.to(id).emit("start game", {combinazione: combinazione})
          players.push({combinazione: combinazione, id:id})
        })
        io.to(players[partita.index].id).emit("start turn")
      }else{
        io.to(socket.id).emit("solo un giocatore connesso")
      }
    }
    else{
      io.to(socket.id).emit("partita già in corso")
    }
    console.log(`User joined room: ${partita}`);
  });
  socket.on("colpo", (coordinate)=>{
    let indexNemico 
    if (partita.index===0){
      indexNemico = 1 
    }else{
      indexNemico = 0
    }
    partita.index=indexNemico
    let enemy = players[indexNemico]
    console.log(enemy.combinazione[coordinate.y][coordinate.x])
    if (enemy.combinazione[coordinate.y][coordinate.x]===1){
      enemy.combinazione[coordinate.y][coordinate.x]=0
      socket.emit("risultato", {num:1, x: coordinate.x, y: coordinate.y})
    }else{
       socket.emit("risultato", {num:0, x: coordinate.x, y: coordinate.y})
    }
    let sentinella = false 
    enemy.combinazione.forEach(row=>{
      if (row.find(r=>r === 1)===1){
        sentinella = true
      }
    })
    console.log(sentinella)
    if (sentinella){
      io.to(players[partita.index].id).emit("start turn")
    }else{
        resetmio()
        io.to(socket.id).emit("fine partita", 1)
        io.to(players[partita.index].id).emit("fine partita", 0)
        players=[]
      }
  })

  socket.on("disconnect", () => {
    if (partita.users.find(sid=>sid===socket.id)!== undefined){
      partita.users.splice(partita.users.indexOf(socket.id), 1)
    }
    console.log("user disconnected");
  });
});


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


