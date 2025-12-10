import readXlsxFile from 'read-excel-file/node';
import fs from 'node:fs';


readXlsxFile('./src/data2.xlsx').then(data => {
    const columns = data[0];
//   console.log(columns)
    let obj = [];
    for(let i=1; i < data.length; i++) {
        const temp = {};
        for(let j=0; j < columns.length; j++) {
            // console.log(columns[j])
            
            temp[columns[j]] = data[i][j]
        }

        // console.log(typeof temp) 
        // fs.writeFile('info.json', JSON.stringify(temp), 'utf8', (err) => {
        //     if (err) throw err;
        //     console.log('The file has been saved!');
        // }); 
        obj.push(temp)
    }
        // console.log(typeof temp) 
        fs.writeFile('info.json', JSON.stringify(obj, null, 2), 'utf8', (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
        }); 
    
})  