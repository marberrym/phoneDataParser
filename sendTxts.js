require('dotenv').config();
const fetch = require('node-fetch');
const client = require('twilio')(process.env.SID, process.env.token);
const csv = require('csvtojson/v1');

let twilioNum = '+14704410636'

let testResults = './csvData/testResults.csv'

let body = 'Hey this is Dustin with Piedmont Ridge Builders, we are doing some work in your neighborhood and I wanted to see if you were interested in selling your property.'

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
