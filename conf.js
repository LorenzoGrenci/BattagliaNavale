const fs = require("fs");
module.exports = {
  host: "mysql-38d67b38-itis-22d9.a.aivencloud.com",
  user: "avnadmin",
  password: "AVNS_5IByNF1UZh2kclmK4_K",
  database: "BattagliaNavale",
  port: 10107,
  ssl: {
    ca: fs.readFileSync("ca.pem"),
    rejectUnauthorized: true,
  },
};