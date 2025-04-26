/**
 * DT207G - Moment2 Del 1
 * Webbtjänster
 * Av Caroline Jungefalk Palmgren
 */

//Importera paket
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

//insällnigar
const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(cors());

//Starta server
app.listen(port, ()=>{
    console.log("Server running on port: " + port)
});