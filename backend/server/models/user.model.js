import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';


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


userSchema.pre('save', function(next){
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
});

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model('user', userSchema);
export default User;
