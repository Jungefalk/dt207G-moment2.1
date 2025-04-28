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