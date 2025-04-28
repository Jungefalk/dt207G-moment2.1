/**
 * Anslut till- och skapa mysql databas med tabell och värden
 */

//Importera paket
const mysql = require("mysql");
require("dotenv").config();

//Databasanslutnig
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

//Query för att radera tabellen om den redan existerar
connection.query("DROP TABLE IF EXISTS work_experience", (error, result) => {
    if (error) {
        throw error;
    }
    console.log("Table dropped")
})

//Query för att skapa tabellen work_experience
connection.query(`CREATE TABLE work_experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR (100),
    job_title VARCHAR (100),
    location VARCHAR (100),
    start_date DATE,
    end_date DATE,
    description TEXT
);`, (error, result) => {
    if (error) {
        throw error;
    }
    console.log("work_experience table created")
});

//Skapa data till tabellen
connection.query(`INSERT INTO work_experience (id, company_name, job_title, location, start_date, end_date, description) VALUES (1, "Rusta", "Butiksanställd", "Bromma", "2019-10-10", "2021-03-31", "Kundservice. Kassa. Påfyll. Lager. Inventering.")`, (error, result) => {
    if (error) {
        throw error;
    }
    console.log("Work experience added")
})

connection.query(`INSERT INTO work_experience (id, company_name, job_title, location, start_date, end_date, description) VALUES (2, "Sekelskifte", "Lagerarbetare", "Västberga", "2021-04-16", "2025-09-01", "Inleverans. Truckkörning. Returhantering. Inventering. Plocka och packa.")`, (error, result) => {
    if (error) {
        throw error;
    }
    console.log("Work experience added")
})

