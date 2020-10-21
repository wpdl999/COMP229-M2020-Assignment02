let mongoose = require('mongoose');

// create a model class
let bookModel = mongoose.Schema({
    username: String,
    name: String,
    password: String,
    email: String,
    cellphone: String
},
{
    collection: "components"
});

module.exports = mongoose.model('Book', bookModel);