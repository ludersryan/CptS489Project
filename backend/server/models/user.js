const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        validate: [validator.isEmail, 'invalid email']
    },
    password: String,
    dateCreated: Date,
});


userSchema.methods.generateHash = function(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var User = mongoose.model('user', userSchema);
module.exports = User;
