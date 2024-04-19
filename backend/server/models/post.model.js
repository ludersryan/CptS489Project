import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const postSchema = new Schema({
    name: String,
    brand: String,
    yearProduced: Date,
    description: String,
    favorites: Number,
    price: Number,
    condition: {
        type: String,
        enum: ['Mint', 'Excellent', 'Good', 'Fair', 'Poor', 'For parts or not working', 'N/A']
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});



var Post = mongoose.model('post', postSchema);
export default Post;
