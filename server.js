/**
 * DT207G - Moment2 Del 1
 * Webbtjänster
 * Av Caroline Jungefalk Palmgren
 */

//Importera paket
const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

//hämta variabler från env-filen
require("dotenv").config();

//insällnigar
const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(cors());

/**
 * Routes
 */

//read
app.get("/api", (req, res) => {
    res.json({ message: "Welcome to my work experience API" });
});

//read
app.get("/api/work_experience", (req, res) => {
    res.json({ message: "Get work experience" })
});

//create
app.post("/api/work_experience", (req, res) => {
    res.json({ message: "Work expreience added" })
});

//update
app.put("/api/work_experience/:id", (req, res) => {
    res.json({ message: `Work experience updated: ${req.params.id}` })
});

//delete
app.delete("/api/work_experience/:id", (req, res) => {
    res.json({ message: `Work experience deleted: ${req.params.id}` })
});

//Starta server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});