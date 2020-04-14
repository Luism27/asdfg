//data base
var mysql = require('mysql');
module.exports.conec = mysql.createConnection({
    host: "caesolucionesiee.c7reutyzgzlp.us-east-1.rds.amazonaws.com",
  user: "mauzoro",
  password: "ronoroazoro123",
  database: 'SyrusDataBase',
  port:3305
});

//sniffer
const dgram = require("dgram");
module.exports.server = dgram.createSocket("udp4");
require('./sniffer/sniffer');
//web server 
const express = require("express");
module.exports.express1 = express;
module.exports.app = express();
module.exports.body = require("body-parser");

//routes 
require('./routes/rutas');