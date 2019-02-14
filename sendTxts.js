require('dotenv').config();
const fetch = require('node-fetch');
const client = require('twilio')(process.env.SID, process.env.token);
const csv = require('csvtojson/v1');

let twilioNum = '+14704410636'

let testResults = './csvData/testResults.csv'

let body = 'Hey this is Matt with PRB. Sent with hand crafted code by yours truly.'

let fireTexts = (dataSource) => {
    try {
        csv().fromFile(dataSource)
        .on('json', (jsonObj) => {
            console.log(jsonObj.phone)
            client.messages
                    .create({from: twilioNum, body: body, to: `+1${jsonObj.phone}`})
                    .then(message => console.log(message))
                    .done();
        })
        .on('done', () => {
            console.log('Done.')
        })
    }
    catch(error) {
        console.log(error);
    }
}

fireTexts(testResults);
