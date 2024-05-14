const express = require("express");
const fs = require("fs");
const http = require("http");
const path = require("path");
const app = express();
const mysql = require("mysql2");
const conf = require("./conf.js");
const connection = mysql.createConnection(conf);
const bodyParser = require("body-parser");
const { Server } = require("socket.io");

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
    }
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

//websocket
const io = new Server(server);
app.post("/new_c", (req, res) => {
  let username = req.body.username;
  let date = new Date().toLocaleString();
  console.log("socket connected: " + req.body.username);
  io.emit("chat", date + ".. " + "NUOVO UTENTE: " + req.body.username);
  res.send("ok");
});

app.post("/new_p", (req, res) => {
  let message = req.body.message;
  let user = req.body.username;
  let date = new Date().toLocaleString();
  console.log("message: " + message);
  io.emit("chat", date + ".. " + user + ".. " + message);
  res.send("ok");
});

server.listen(conf.port, () => {
  console.log("server running on port: " + conf.port);
});

//server
const server = http.createServer(app);
server.listen(80, () => {
  console.log("Server running");
});
