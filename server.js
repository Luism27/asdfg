//data base
var mysql = require('mysql');
module.exports.conec = mysql.createConnection({
    host: "design.ck9qlt1qutiu.us-east-1.rds.amazonaws.com",
  user: "dark",
  password: "mr01121998",
  database: 'design'
});

//sniffer
const dgram = require("dgram");
module.exports.server = dgram.createSocket("udp4");
require('./sniffer/sniffer');
//web server 
const express = require("express");
module.exports.express1 = express;
module.exports.app = express();
//routes 
require('./routes/rutas');