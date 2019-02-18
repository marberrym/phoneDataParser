const csv = require('csvtojson/v1');
const fs = require('fs');

let data = './csvData/contactsFilter.csv'

let filterMobiles = (dataSource) => {
    fs.writeFile('./csvData/mobiles.csv', 'phone \n', (err) => {
        console.log(err);
    })
    csv().fromFile(dataSource)
    .on('json', (jsonObj) => {
        console.log(jsonObj);
        if (jsonObj.PhoneType === "W") {
            fs.appendFile('./csvData/mobiles.csv', `${jsonObj.phone}, \n`, (err) => {
                console.log(err)
            })
        } else {
            null
        }
    })
    .on('done', () => {
        console.log("done");
    })
}

filterMobiles(data);