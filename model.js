const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
  "client_id": {type: String, required: true},
  "date_of_form": Date,
  "wound_location": String,
  "shape_of_wound": String,
  "question_one": Number,
  "question_two": Number,
  "question_three": Number,
  "question_four": Number,
  "question_five": Number,
  "question_six": Number,
  "question_seven": Number,
  "question_eight": Number,
  "question_nine": Number,
  "question_ten": Number,
  "question_eleven": Number,
  "question_twelve": Number,
  "question_thirteen": Number,
  "score": Number
});

formSchema.methods.apiRepr = function () {
    return {
      id: this._id,
      client_id: this.client_id,
      date_of_form: this.date_of_form,
      wound_location: this.wound_location,
      shape_of_wound: this.shape_of_wound,
      question_one: this.question_one,
      question_two: this.question_two,
      question_three: this.question_three,
      question_four: this.question_four,
      question_five: this.question_five,
      question_six: this.question_six,
      question_seven: this.question_seven,
      question_eight: this.question_eight,
      question_nine: this.question_nine,
      question_ten: this.question_ten,
      question_eleven: this.question_eleven,
      question_twelve: this.question_twelve,
      question_thirteen: this.question_thirteen,
      score: this.score
    };
};

const clientSchema = mongoose.Schema({
    "first_name": String,
    "last_name": String,
    "hospital_name": String,
    "city": String,
    "client_state": String,
    "start_date": Date,
    "end_date": Date,
    "age": Number,
    "weight": Number
});

clientSchema.methods.apiRepr = function () {
    return {
      id: this._id,
      first_name: this.first_name,
      last_name: this.last_name,
      hospital_name: this.hospital_name,
      city: this.city,
      client_state: this.client_state,
      start_date: this.start_date,
      end_date: this.end_date,
      age: this.age,
      weight: this.weight
    };
};

const Form = mongoose.model('Form', formSchema);
const Client = mongoose.model('Client', clientSchema);

module.exports = {Form, Client};
