# Moment 2.1 Av Caroline Jungefalk
Detta är en labb för kursen DT207G i backend-baserad webbutveckling.  
Syftet med labben är att förstå hur man kan bygga egna webbtjänster samt använda Fetch API för att använda dem.  
  
  Repot innehåller kod för en enkel webbtjänst som är byggd med SQLite och Express med funktionalitet för CRUD och hanterar ett CV. 

## länk
Länk till APIet[https://dt207g-moment2-1-bgly.onrender.com/api/work_experience](https://dt207g-moment2-1-bgly.onrender.com/api/work_experience)

## Installation, databas

SQLite används för API:et. För att använda det, klona ner filerna och installera nödvändiga paket med npm install. För att bygga databasen kör installationsscriptet så skapas tabeller enl nedan.

| Kolumn | Datatyp | Beskrivning |
| --- | --- | --- |
| id | INTEGER | Primärnyckel |
| company_name | TEXT | Namn på företaget |
| job_title | TEXT | Jobbtitel |
| location | TEXT | Plats |
| start_date | DATE | Startdatum |
| end_date | DATE | Slutdatum |
| description | TEXT | Arbetsbeskrivning |

## Användning
Nedan beskrivs API:ets endpoints. 

| Metod | Endpoint | Beskrivning |
| --- | --- | --- |
| GET | api/work_experience | Hämtar befintlig data |
| POST | api/work_experience | Lägger till en ny "work experience" baserat på ett objekt | 
| PUT | api/work_experience/:id | Uppdatera existerande post med baserat på dess id |
| DELETE | api/work_experience/:id | Raderar post baserat på angivet id |
