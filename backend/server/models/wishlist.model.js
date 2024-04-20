import mongoose from 'mongoose';

const Schema = mongoose.Schema;


const wishListSchema = new Schema({
    dateAdded: Date,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'
    },
});



var WishList = mongoose.model('wishlist', wishListSchema);
export default WishList;
