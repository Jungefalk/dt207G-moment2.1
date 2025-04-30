/**
 * DT207G - Moment2 Del 1
 * Webbtjänster
 * Av Caroline Jungefalk Palmgren
 */

//Importera paket
const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3");


//inställnigar
const app = express();
const port = 3000;

//middleware
app.use(express.json());
app.use(cors());


//Anslut till databas
const db = new sqlite3.Database("./db/cv.db", (error) => {
    if (error) {
        return console.error("Connection to database failed " + error.message);
    }
    console.log("Connected to database");

});

/**
 * Routes
 */

//read
app.get("/api/work_experience", (req, res) => {

    //Hämta databastabell
    db.all(`SELECT * FROM work_experience`, (err, results) => {
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
    let company_name = req.body.company_name;
    let job_title = req.body.job_title;
    let location = req.body.location;
    let start_date = req.body.start_date;
    let end_date = req.body.end_date;
    let description = req.body.description;

    //kontrollera att nödvändig information är korrekt
    if (!company_name || !job_title || !location || !start_date || !end_date || !description) {
        return res.status(400).json({ message: "All the fields of work experience needs to be filled out" });
    }

    //Lägg till i databasen

    const stmt = db.prepare("INSERT INTO work_experience (company_name, job_title, location, start_date, end_date, description)VALUES(?, ?, ?, ?, ?, ?);");

    stmt.run(company_name, job_title, location, start_date, end_date, description, (error) => {
        if (error) {
            console.error(`There was an error: ${error} `)
            res.status(500).json({ message: "An error occured: " + error })
        } else {
            res.status(201).json({ message: "work experience added" })
        };
        stmt.finalize();
    });
});

//update - baserat på ID
app.put("/api/work_experience/:id", (req, res) => {

    //variabler
    const id = req.params.id;
    const { company_name, job_title, location, start_date, end_date, description } = req.body;

    //kontroll att alla fält är korrekta
    if (!company_name || !job_title || !location || !start_date || !end_date || !description) {
        return res.status(400).json({ message: "All the fields of work experience needs to be filled out" })
    }

    //Uppdatera värde i databasen
    db.run(`UPDATE work_experience SET company_name=?, job_title=?, location=?, start_date=?, end_date=?, description=? WHERE id=?`, [company_name, job_title, location, start_date, end_date, description, id], (error) => {
        if (error) {
            res.status(500).json({ message: "An error occured, try again later" + error.message })
        } else {
            res.json({ message: `Work experience updated: ${id}` })
        }
    });
});

//delete - baserat på ID
app.delete("/api/work_experience/:id", (req, res) => {

    //variabel för id
    const id = req.params.id;

    //Ta bort en work experience
    db.run(`DELETE FROM work_experience WHERE id = ?`, [id], (error) => {
        if (error) {
            res.status(500).json({ message: "An error occured, try again later" + error.message })
        } else {
            res.json({ message: `Work experience deleted: ${id}` })
        }
    });

});

//Starta server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
});