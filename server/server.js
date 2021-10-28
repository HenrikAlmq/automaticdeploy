//Hämtar express(server)
const express = require('express');
//Hämtar fileSystem så vi kan hantera filer
const fs = require('fs');
//Hämtar cors så vi kan testa mellan klient och server, för att installera skriv - npm i cors.
const cors = require("cors");
//Kopplar ihop app med servern.
const app = express();
//Vi lägger till en middleware på appen som gör det tillåtet att skicka request mellan server och klient.
app.use(cors());

//Middleware som parsar bodyn av requested från en sträng till ett JSON objekt.
app.use(express.json())

//Skapar en post till emails.json -- Man börjar med att läsa in filen med fs.readFile()
app.post("/", (req, res) => {
    fs.readFile("emails.json", (err, data) => {
        //Om det är något fel på requested så skicka tillbaka statuskod 400 och skriv ut till kliented, "Could not update maillist". Sedan return för att inte fortsätta, skickar endast felmeddelade 1x gång.
        if (err) {
            console.log(err);
            res.status(400).json({sucesss: false});
            return;
        }
        
        //Hämtar JSON filen från parametern data, parsar från ett objekt och sparar ner det i variabel email. Tänk som i Localstorage, man hämtar datan först, manipulerar den och sedan skickar tillbaka den.
        const emails = JSON.parse(data)
        //Pushar ner mailadressen som är hämtad från bodyn av requested till JSON filen.
        emails.push(req.body)
        //man skriver in datan från emails till emails.json, gör en stringify(konventera datan), formaterar (null, 2), gör en callback funktion och loggar ut eventuella felmeddelanden.
        fs.writeFile("emails.json", JSON.stringify(emails, null, 2), (err) => {
            if(err) {
                console.log(err)
            }
        })
        //Om requested går bra så skickar vi tillbaka statuskod 200 och en meddelande (Success!) till klienten.
        res.status(200).json({sucess: true});

    })
});

//Skapa ett get-anrop till Frontend där man kan hämta JSON filen.
app.get("/emails", (req, res) => {
    fs.readFile("emails.json", (err, data) => {
        if (err) {
            console.log(err)
            res.status(400).json({sucess: false})
            return;
        }

        let saveData = data;
        res.send(saveData);
    })
});


//Skapa servern med port 5000, logga ut i konsonl att server är startad.
app.listen(5000, () => console.log("Connected to server.."));