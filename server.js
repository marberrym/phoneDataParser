require('dotenv').config();
const http = require('http');
const express = require('express');
const MsgResponse = require('twilio').twiml.MessagingResponse;
const client = require('twilio')(process.env.SID, process.env.token);

const app = express();

let twilioNum = '+14704410636'

app.post('/sms', (req, res) => {
    let twiml = new MsgResponse
    twiml.message('The Robots are coming! Head for the hills!');
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    // client.messages
    //     .create({from: twilioNum, body: req.body, to: '+17703675775'})
    //     .then(message => console.log(message))
    //     .done();
  }
);


http.createServer(app).listen(5772, () => {
    console.log('Express server listening on port 5772');
    }
);