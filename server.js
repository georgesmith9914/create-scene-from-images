const express = require('express')
var bodyParser = require('body-parser')
const fs = require('fs');
const https = require('https');

const app = express()
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
const port = 443;

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  };

app.use(express.static('public'));

const users = {
    'user-a': { password: 'user-a-pass', serverData: { id: 1, role: 'user' } },
    'user-b': { password: 'user-b-pass', serverData: { id:2, role: 'user' } },
    'data-provider': {
      password: 'provider-pass', serverData: { role: 'provider'}
    }
  }

  app.post('/authenticate-user', function (req, res) {
    console.log( 'received auth request for ' + req.body.authData.username );
    const user = users[ req.body.authData.username ];
    if( user && user.password === req.body.authData.password ) {
        res.status( 200 ).json({
            username: req.body.authData.username,
            serverData: user.serverData
        });
    } else {
        res.sendStatus( 403 );
    }
});

var server = https.createServer(options, app);

server.listen(port, () => {
    console.log("server starting on port : " + port)
});