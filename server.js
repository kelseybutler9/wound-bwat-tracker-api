const express = require('express');
const app = express();
const cors = require('cors');
const {CLIENT_ORIGIN, DATABASE_URL, PORT} = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {Form, Client} = require('./model');

mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

app.use(cors({origin: CLIENT_ORIGIN}));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

app.get('/api/*', (req, res) => {
   res.json({ok: true});
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

let server;

function runServer () {
   return new Promise((resolve, reject) => {
     mongoose.connect(DATABASE_URL, err => {
       if (err) {
         return reject(err);
       }
     });

     server = app.listen(PORT, () => {
       console.log(`Your app is listening on port ${PORT}`);
       resolve(server);
     }).on('error', err => {
       mongoose.disconnect();
       reject(err);
     });
   });
}

function closeServer () {
   return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
         if (err) {
           return reject(err);
         }
         resolve();
       });
     });
   });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
}

app.get('/forms', (req, res) => {
  Form
    .find()
    .then(forms => {
      console.log(forms);
      res.json(forms.map(form => form.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

app.get('/clients', (req, res) => {
  Client
    .find()
    .then(clients => {
      console.log(clients);
      res.json(clients.map(client => client.apiRepr()));
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});

module.exports = {app, runServer, closeServer};
