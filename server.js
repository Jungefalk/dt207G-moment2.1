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

//databasanslutning med mysql
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

//Kontrollera anslutning
connection.connect((error) => {
    if (error) {
        console.log(`Connection failed ${error}`)
    }

    console.log(`Connected to database`)

});

//middleware
app.use(express.json());
app.use(cors());

/**
 * Routes
 */

//read
app.get("/api/work_experience", (req, res) => {

    //Hämta databastabell
    connection.query(`SELECT * FROM work_experience`, (err, results) => {
        if (err) {
            res.status(500).json({ error: `Something went wrong ${err}` });
            return;
        }

        console.table(results);
        //kontrollera att det finns data att hämta
        if (results.length === 0) {
            res.status(200).json({ message: "No work experience found" })
        } else {
            res.json(results);
        }

    })

});

//create
app.post("/api/work_experience", (req, res) => {

    //Lagra data i varaibler
    let id = req.body.id;
    let company_name = req.body.company_name;
    let job_title = req.body.job_title;
    let location = req.body.location;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let description = req.body.description;

    //kontrollera att nödvändig information är korrekt
    if (!id || !company_name || !job_title || !location || !start_date || !end_date || !description) {
        return res.status(400).json({ message: "All the fields of work experience needs to be filled out" });
    }

    //Lägg till i databasen
    connection.query(`INSERT INTO work_experience (company_name, job_title, location, start_date, end_date, description)VALUES(?, ?, ?, ?, ?, ?)`, [company_name, job_title, location, start_date, end_date, description], (error, results) => {
        if (error) {
            console.error(`There was an error: ${error} `)
            res.status(500).json({ message: "An error occured" })
        } else {
            res.status(201).json({ message: "work experience added" })
        }
    });
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