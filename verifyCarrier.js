require('dotenv').config();
const client = require('twilio')(process.env.SID, process.env.token);
const fs = require('fs');
const csv = require('csvtojson');

const verifiedDataSource = './csvData/testResults.csv'
const verifiedDataStore = './csvData/verifiedNums.csv'

let verifyNums = (dataSource, dataStore) => {
    fs.writeFile(dataStore, 'phone, carrier, \n', (err, file) => {
        if (err) {
            console.log(err);
            throw err;
        }
    })
    try {
        csv().fromFile(dataSource)
        .on('json', (json) => {
            fs.appendFile(dataStore, json, (err, file) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
            })
        })
        .on('done', () => {
            console.log('done')
        })
    }
    catch(error) {
        console.log(error)
    }
}

verifyNums(verifiedDataSource, verifiedDataStore);