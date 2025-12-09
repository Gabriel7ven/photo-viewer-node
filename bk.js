import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import XLXS from "xlsx";
import { readFileSync } from "fs";
import { read } from "xlsx/xlsx.mjs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Serve index sem dados
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname + "/public/index.html");
  let indexHtml = fs.readFileSync(indexPath, "utf8");
  indexHtml = indexHtml.replace("<!--SERVER_DATA-->", "<script>window.SERVER_DATA = null;</script>");
  res.send(__dirname + "/public/index.html");
});


const buf = readFileSync("data.xlsx");
/* buf is a Buffer */
const workbook = read(buf); 

const wb = XLXS.readFile("data.xlsx")
console.log(wb["Strings"])

const lista = ['114201518',
'114159215',
'114201603',
'114203128'
]
for(let i=0; i < lista.length; i++){
    app.get(`/${lista[i]}`, (req, res) => {
        res.send(`<h1>${lista[i]}</h1>`)

});
}
// Rota dinâmica que carrega dados da planilha Excel (data.xlsx na raiz)
// app.get("/:id", (req, res) => {
//   const id = String(req.params.id);
//   const filePath = path.join(__dirname, "data.xlsx");

//   if (!fs.existsSync(filePath)) {
//     return res.status(404).send(`Planilha não encontrada em ${filePath}. Coloque o arquivo 'data.xlsx' na raiz do projeto.`);
//   }

//   try {
//     const wb = XLSX.readFile(filePath);
//     const ws = wb.Sheets[wb.SheetNames[0]];
//     const rows = XLSX.utils.sheet_to_json(ws, { defval: "" });

//     // Procura por uma linha que contenha o id em qualquer coluna
//     const found = rows.find(r => Object.values(r).map(v => String(v)).includes(id));

//     const indexPath = path.join(__dirname, "public", "index.html");
//     let indexHtml = fs.readFileSync(indexPath, "utf8");
//     const dataScript = `<script>window.SERVER_DATA = ${JSON.stringify(found || null)};</script>`;
//     indexHtml = indexHtml.replace("<!--SERVER_DATA-->", dataScript);
//     res.send(indexHtml);
//   } catch (err) {
//     res.status(500).send("Erro ao ler a planilha: " + err.message);
//   }
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});