const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const postSchema = new Schema({
    name: String,
    brand: String,
    yearProduced: Date,
    description: String,
    favorites: Number,
    condition: {
        type: String,
        enum: ['Mint', 'Excellent', 'Good', 'Fair', 'Poor', 'For parts or not working']
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});



var Post = mongoose.model('post', postSchema);
module.exports = Post;
