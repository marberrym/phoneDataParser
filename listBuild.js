const csv = require('csvtojson/v1');
const fs = require('fs');

let sendList = [];
let contacts = './csvData/contacts.csv';
let results = './csvData/results.csv';

let phoneRegex = /\b\s*[-. (]*(\d{1,3})[-. )]*(\d{3})[-. ]*(\d{4})\s*/g
let parseChars = /([() .-]|[\r\n|\r|\n])/g

function readList() {
    fs.writeFile('./csvData/results.csv', 'phone, \n', (err, file) => {
        if (err) {
            console.log(err);
            throw err;
        }
    })
    
    try {
        csv().fromFile(contacts)
        .on('json', (jsonObj) => {
            Object.values(jsonObj).forEach(item => {
                if (item.match(phoneRegex)) {
                    item.match(phoneRegex).forEach(number => {
                        let numFormatted = number.replace(parseChars, '')
                        if (numFormatted.length === 8) {
                            let newNum;
                            if (number[0] = 4) {
                               newNum = `404${numFormatted.substr(1)}` 
                            }
                            else if (numFormatted[0] = 7) {
                                newNym = `770${numFormatted.substr(1)}`
                            }
                            else if (numFormatted[0] = 6) {
                                newNym = `678${numFormatted.substr(1)}`
                            }
                            
                            fs.appendFile('./csvData/results.csv', `${newNum.replace(parseChars, '')}, \n`, (err) => {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                            })
                        }
                        else if (numFormatted.length === 10){
                            fs.appendFile('./csvData/results.csv', `${number.replace(parseChars, '')}, \n`, (err) => {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                            })

                        }
                        else {
                            null
                        }
                    });
                }
            })
        })
        .on('done', () => {
            console.log("Done.")
        })
    }
    catch(error) {
        console.log(error)
    }
}


readList();
