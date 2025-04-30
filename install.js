/**
 * Anslut till- och skapa sqlite3 databas med tabell och värden
 */

//Importera paket
const sqlite3 = require("sqlite3").verbose();

//Skapa databas och kontrollera anslutning
const db = new sqlite3.Database("./db/cv.db", (error) => {
    if (error) {
        return console.error("Connection to database failed " + error.message);
    }
    console.log("Connected to database");

});

//Skapa tabell till databas, radera om den redan finns
db.serialize(() => {
    db.run("DROP TABLE IF EXISTS work_experience", (error) => {
        if (error) {
            throw error;
        }
        console.log("table dropped")
    });

    //Skapa tabell
    db.run(`CREATE TABLE work_experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    company_name TEXT NOT NULL,
    job_title TEXT NOT NULL,
    location TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT
    );`, (error) => {
        if (error) {
            throw error;
        };

        console.log("Table created");

        //Skapa data till tabell
        const stmt = db.prepare("INSERT INTO work_experience (company_name, job_title, location, start_date, end_date, description)VALUES(?, ?, ?, ?, ?, ?);");

        stmt.run("Rusta", "Butiksanställd", "Bromma", "2019-10-10", "2021-03-31", "Kundservice. Kassa. Påfyll. Lager. Inventering.", (error, result) => {
            if (error) {
                throw error;
            };
            console.log("Work experience added");
        });

        stmt.run("Sekelskifte", "Lagerarbetare", "Västberga", "2021-04-16", "2025-09-01", "Inleverans. Truckkörning. Returhantering. Inventering. Plocka och packa.", (error, result) => {
            if (error) {
                throw error;
            }
            console.log("Work experience added");
        });

        stmt.finalize((error) => {
            if (error) {
                throw error;
            }

            //Stäng databasen
            db.close((error) => {
                if (error) {
                    throw error;
                }
                console.log("database closed");
            });
        });
    });
});
