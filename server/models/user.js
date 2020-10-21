let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let Schema = mongoose.Schema; // alias
let Model = mongoose.model; // alias

let UserSchema = Schema({
    username: String,
    //password: String
    email: String,
    displayName: String,
    created:
    {
        type: Date,
        default: Date.now()
    },
    updated:
    {
        type: Date,
        default: Date.now()
    }
},
{
    collection: 'users'
});

UserSchema.plugin(passportLocalMongoose);


module.exports.User = Model('User', UserSchema);