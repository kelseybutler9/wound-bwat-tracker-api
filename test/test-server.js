const chai = require('chai');
const chaiHttp = require('chai-http');

const {app, closeServer, runServer} = require('../server');
const newClient = require('./fixtures/new-client');
const newForm = require('./fixtures/new-form');

 const should = chai.should();
 chai.use(chaiHttp);

describe('Clients', function () {
  beforeEach(function () {
    return runServer();
  });

  afterEach(function () {
    return closeServer();
  });

  it('should list clients on GET', function () {
    return chai.request(app)
      .get('/clients')
      .then(function (res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.an('array');
        res.body.should.have.length.of.at.least(1);
        res.body.forEach(function (item) {
          item.should.be.an('object');
          item.should.include.keys('id', 'first_name', 'last_name', 'city', 'client_state', 'start_date', 'end_date', 'age', 'weight');
        });
      });
  });

  it('should add a client on POST', function () {
    return chai.request(app)
      .post('/clients')
      .send(newClient)
      .then(function (res) {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.include.keys('first_name', 'last_name', 'city', 'client_state', 'start_date', 'end_date', 'age', 'weight');
        res.body.first_name.should.be.a('string');
        res.body.last_name.should.be.a('string');
        res.body.city.should.be.a('string');
        res.body.client_state.should.be.a('string');
        res.body.start_date.should.be.a('string');
        res.body.end_date.should.be.a('string');
        res.body.age.should.be.a('number');
        res.body.weight.should.be.a('number');

        res.body.first_name.should.equal(newClient.first_name);
        res.body.last_name.should.equal(newClient.last_name);
        res.body.city.should.equal(newClient.city);
        res.body.client_state.should.equal(newClient.client_state);
        res.body.start_date.should.equal(newClient.start_date);
        res.body.end_date.should.equal(newClient.end_date);
        res.body.age.should.equal(newClient.age);
        res.body.weight.should.equal(newClient.weight);
      });
  });
});

  describe('Forms', function () {
    beforeEach(function () {
      return runServer();
    });

    afterEach(function () {
      return closeServer();
    });

    it('should list forms on GET', function () {
      return chai.request(app)
        .get('/forms')
        .then(function (res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function (item) {
            item.should.be.a('object');
            item.should.include.keys('id', 'client_id', 'date_of_form', 'wound_location', 'shape_of_wound', 'question_one', 'question_two', 'question_three', 'question_four', 'question_five', 'question_six', 'question_seven', 'question_eight', 'question_nine', 'question_ten', 'question_eleven', 'question_twelve', 'question_thirteen', 'score'
          )});
        });
    });

    it('should add a form on POST', function () {
      return chai.request(app)
        .post('/forms')
        .send(newForm)
        .then(function (res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.an('object');
          res.body.should.include.keys(
            'id',
            'client_id',
            'date_of_form',
            'wound_location',
            'shape_of_wound',
            'question_one',
            'question_two',
            'question_three',
            'question_four',
            'question_five',
            'question_six',
            'question_seven',
            'question_eight',
            'question_nine',
            'question_ten',
            'question_eleven',
            'question_twelve',
            'question_thirteen',
            'score'
          );
          res.body.client_id.should.be.a('string');
          res.body.date_of_form.should.be.a('string');
          res.body.wound_location.should.be.a('string');
          res.body.shape_of_wound.should.be.a('string');
          res.body.question_one.should.be.a('number');
          res.body.question_two.should.be.a('number');
          res.body.question_three.should.be.a('number');
          res.body.question_four.should.be.a('number');
          res.body.question_five.should.be.a('number');
          res.body.question_six.should.be.a('number');
          res.body.question_seven.should.be.a('number');
          res.body.question_eight.should.be.a('number');
          res.body.question_nine.should.be.a('number');
          res.body.question_ten.should.be.a('number');
          res.body.question_eleven.should.be.a('number');
          res.body.question_twelve.should.be.a('number');
          res.body.question_thirteen.should.be.a('number');
          res.body.score.should.be.a('number');

          res.body.client_id.should.equal(newForm.client_id);
          res.body.date_of_form.should.equal(newForm.date_of_form);
          res.body.wound_location.should.equal(newForm.wound_location);
          res.body.shape_of_wound.should.equal(newForm.shape_of_wound);
          res.body.question_one.should.equal(newForm.question_one);
          res.body.question_two.should.equal(newForm.question_two);
          res.body.question_three.should.equal(newForm.question_three);
          res.body.question_four.should.equal(newForm.question_four);
          res.body.question_five.should.equal(newForm.question_five);
          res.body.question_six.should.equal(newForm.question_six);
          res.body.question_seven.should.equal(newForm.question_seven);
          res.body.question_eight.should.equal(newForm.question_eight);
          res.body.question_nine.should.equal(newForm.question_nine);
          res.body.question_ten.should.equal(newForm.question_ten);
          res.body.question_eleven.should.equal(newForm.question_eleven);
          res.body.question_twelve.should.equal(newForm.question_twelve);
          res.body.question_thirteen.should.equal(newForm.question_thirteen);
          res.body.score.should.equal(newForm.score);
        });
    });
  });
