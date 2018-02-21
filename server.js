require('dotenv').load();

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

app.get('/forms/:id', (req, res) => {
  Form
    .findById(req.params.id)
    .then(form => res.json(form.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

app.get('/clients/:id', (req, res) => {
  Form
    .findById(req.params.id)
    .then(client => res.json(client.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went horribly awry'});
    });
});

app.post('/forms', jsonParser, (req, res) => {
  if (!(req.body.client_id)) {
    const message = `Missing client ID in request body`;
    console.error(message);
    return res.status(400).send(message);
  }

  Form
    .create({
      client_id: req.body.client_id,
      date_of_form: req.body.date_of_form,
      wound_location: req.body.wound_location,
      shape_of_wound: req.body.shape_of_wound,
      question_one: req.body.question_one,
      question_two: req.body.question_two,
      question_three: req.body.question_three,
      question_four: req.body.question_four,
      question_five: req.body.question_five,
      question_six: req.body.question_six,
      question_seven: req.body.question_seven,
      question_eight: req.body.question_eight,
      question_nine: req.body.question_nine,
      question_ten: req.body.question_ten,
      question_eleven: req.body.question_eleven,
      question_twelve: req.body.question_twelve,
      question_thirteen: req.body.question_thirteen,
      score: req.body.score
    })
    .then(form => res.status(201).json(form.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Something went wrong'});
    });
});

app.post('/clients', jsonParser, (req, res) => {
  if (!(req.body.first_name)) {
    const message = `Missing first name in request body`;
    console.error(message);
    return res.status(400).send(message);
  }

  Client
    .create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      hospital_name: req.body.hospital_name,
      city: req.body.city,
      client_state: req.body.client_state,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      age: req.body.age,
      weight: req.body.weight
    })
    .then(client => res.status(201).json(client.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'Something went wrong'});
    });
});

module.exports = {app, runServer, closeServer};
