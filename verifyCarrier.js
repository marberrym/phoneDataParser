require('dotenv').config();
const client = require('twilio')(process.env.SID, process.env.token);
const fs = require('fs');
const csv = require('csvtojson/v1');

const verifiedDataSource = './csvData/testResults.csv'
const verifiedDataStore = './csvData/verifiedNums.csv'

let verifyNums = (dataSource, dataStore) => {
    fs.writeFile(dataStore, 'phone, carrier, \n', (err, file) => {
        if (err) {
            console.log(err);
            throw err;
        }
    })

    csv().fromFile(dataSource)
    .on('json', (jsonObj) => {
        let body = `${jsonObj.phone}, mobile,\n`
        fs.appendFile(dataStore, body, (err, file) => {
            if (err) {
                console.log(err);
                throw err;
            }
        })
        console.log(jsonObj)
    })
    .on('done', () => {
        console.log("DONE")
    })
}

verifyNums(verifiedDataSource, verifiedDataStore);