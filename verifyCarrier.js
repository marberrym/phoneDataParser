require('dotenv').config();
const client = require('twilio')(process.env.SID, process.env.token);
const fs = require('fs');
const csv = require('csvtojson/v1');

const verifiedDataSource = './csvData/testResults.csv'
const verifiedDataStore = './csvData/verifiedNums.csv'

let totalNums = 0;
let mobileNums = 0;
let landlineNums = 0;

let verifyNums = (dataSource, dataStore) => {
    
    fs.writeFile(dataStore, 'phone, carrier, \n', (err, file) => {
        if (err) {
            console.log(err);
            throw err;
        }
    })

    csv().fromFile(dataSource)
    .on('json', (jsonObj) => {
        client.lookups.phoneNumbers(`+1${jsonObj.phone}`)
        .fetch({type: "carrier"})
        .then(carrier => {
            totalNums += 1;
            console.log(jsonObj.phone)
            console.log(carrier.carrier.type)
            if (carrier.carrier.type === 'mobile') {
                mobileNums += 1;
                let body = `${jsonObj.phone}, mobile, \n`
                fs.appendFile(dataStore, body, (err, file) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    
                })
            } else {
                landlineNums += 1;
                null
            }
        })
    })
    .on('done', () => {
        console.log("DONE")
    })
}


verifyNums(verifiedDataSource, verifiedDataStore);


