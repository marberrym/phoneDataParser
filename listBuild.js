const csv = require('csvtojson/v1');
const fs = require('fs');

let sendList = [];
let contacts = './csvData/contacts.csv';
let results = './csvData/results.csv';

let testContacts = './csvData/testData.csv'
let testResults = './csvData/testResults.csv'

let phoneRegex = /\b\s*[-. (]*(\d{1,3})[-. )]*(\d{3})[-. ]*(\d{4})\s*/g
let parseChars = /([() .-]|[\r\n|\r|\n])/g

let buildList = (dataSource, dataStore) => {
    fs.writeFile(dataStore, 'phone, \n', (err, file) => {
        if (err) {
            console.log(err);
            throw err;
        }
    })
    
    try {
        csv().fromFile(dataSource)
        .on('json', (jsonObj) => {
            Object.values(jsonObj).forEach(item => {
                if (item.match(phoneRegex)) {
                    item.match(phoneRegex).forEach(number => {
                        let numFormatted = number.replace(parseChars, '')
                        if (numFormatted.length === 8) {
                            let newNum;
                            console.log(numFormatted[0])
                            if (numFormatted[0] === '4') {
                               newNum = `404${numFormatted.substr(1)}` 
                            }
                            else if (numFormatted[0] === '7') {
                                console.log("Ran path")
                                newNum = `770${numFormatted.substr(1)}`
                            }
                            else if (numFormatted[0] === '6') {
                                newNum = `678${numFormatted.substr(1)}`
                            }
                            
                            fs.appendFile(dataStore, `${newNum}, \n`, (err) => {
                                if (err) {
                                    console.log(err);
                                    throw err;
                                }
                            })
                        }
                        else if (numFormatted.length === 10){
                            fs.appendFile(dataStore, `${number.replace(parseChars, '')}, \n`, (err) => {
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


buildList(contacts, results);
