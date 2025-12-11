import readXlsxFile from 'read-excel-file/node';
import fs from 'node:fs';


readXlsxFile('./src/data2.xlsx').then(data => {
    const columns = data[0];
    let obj = [];
    for(let i=1; i < data.length; i++) {
        const temp = {};
        for(let j=0; j < columns.length; j++) {
            temp[columns[j]] = data[i][j]
        }

        obj.push(temp)
    }
        // console.log(typeof temp) 
        // fs.writeFile('info.json', JSON.stringify(obj, null, 2), 'utf8', (err) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        // }); 

    
})  
























//SYNCHRONOUS

// const fs = require('fs');

// try {
//     // Read the file synchronously (returns a Buffer if no encoding is specified)
//     const jsonString = fs.readFileSync('./path/to/yourfile.json', 'utf8'); 
    
//     // Parse the JSON string into a JavaScript object
//     const data = JSON.parse(jsonString); 

//     // Access a specific node
//     console.log("Accessing data node:", data.propertyName);

// } catch (err) {
//     console.error(err);
// }