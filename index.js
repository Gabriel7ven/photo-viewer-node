import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import readXlsxFile from 'read-excel-file/node'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html")
});



readXlsxFile('data.xlsx').then(function (data) {
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
                res.send(`  <style>
                                .fotos {
                                    display: flex;
                                    gap: 20px;
                                    padding: 50px;
                                }
                                img {
                                    width: 50%;
                                }
                            </style>
                            <div class="fotos">
                                <img src="${jsonData[i]["LINK FOTO 1"]}" alt="imagem de poste">
                                <img src="${jsonData[i]["LINK FOTO 2"]}" alt="imagem de poste">
                            </div>
                            
                        `);
            })
            // console.log(jsonData[i])
    }
    
});



// Inicializar
// initializeServer();
app.listen(port, () => {
            console.log(`Servidor rodando em http://localhost:${port}`);
        });