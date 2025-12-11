import express from "express";
import bodyParser from "body-parser";
import fs, { link } from "fs";
// import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import readXlsxFile from 'read-excel-file/node'
// import { get } from "http";


const __dirname = dirname(fileURLToPath(import.meta.url));
// const staticPath = path.join(__dirname, 'public');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));
//==================
let objData = [];

fs.readFile('./info.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.log("Error reading file from disk:", err);
        return;
    }
    try {
        // Parse the JSON string into a JavaScript object
        const data = JSON.parse(jsonString); 
        objData = data;
        // Access a specific node
        // console.log("Accessing data node:", data.propertyName); 
    } catch (err) {
        console.log('Error parsing JSON string:', err);
    }
});


app.get("/:mslink",(req, res) => {
    const mslink = req.params.mslink
    const item = objData.filter((m) => 
    m.MSLINK == mslink)
    const link1 = item[0]["LINK FOTO 1"]
    const link2 = item[0]["LINK FOTO 2"]
    // console.log(item)
    res.render('fotos.ejs', {link1: link1, link2: link2})
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});

function createGetEndpoints() {
    readXlsxFile('data1.xlsx').then(function (data) {
                        const headers = data[0];
                        const jsonData = [];
                        for (let i = 1; i < data.length; i++) {
                            const temp = {};
                            for (let j = 0; j < headers.length; j++) {
                                temp[headers[j]] = data[i][j];
                            }
                            jsonData.push(temp);
                        }
                    //  console.log(jsonData)
                        // document.getElementById("json_data")
                        //           .value = JSON.stringify(
                        //     jsonData,
                        //     null,
                        //     2
                        // );

        for(let i=0; i < jsonData.length; i++) {
                app.get(`/${jsonData[i]["MSLINK"]}`, (req, res) => {
                    res.send(`  <!DOCTYPE html>
                                <html lang="en">
                                    <head>
                                        <meta charset="UTF-8">
                                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                        <link rel="stylesheet" href="/css/styles.css">
                                        <title>Document</title>
                                    </head>
                                    <body>
                                        <div class="fotos">
                                            <img src="${jsonData[i]["LINK FOTO 1"]}" alt="imagem de poste">
                                            <img src="${jsonData[i]["LINK FOTO 2"]}" alt="imagem de poste">
                                        </div>
                                    </body>
                                </html>
                                
                            `);
                })
                // console.log(jsonData[i])
        }
        
    });
}



// Inicializar
// initializeServer();
app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
});