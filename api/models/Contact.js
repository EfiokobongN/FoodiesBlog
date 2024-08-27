const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const ContactSchema = new Schema({
  name: {type: String, required: true, min: 3},
  email: {type: String, required: true,},
  phone: {type: String, required: true},
  message: {type: String, required: true, minlength: 4},
});

const ContactModel = model('Contact', ContactSchema);

module.exports = ContactModel;