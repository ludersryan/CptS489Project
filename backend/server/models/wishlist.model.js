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

// Compound index to ensure that a user can only have one wishlist item per post
wishListSchema.index({userId: 1, postId: 1}, {unique: true});

var WishList = mongoose.model('wishlist', wishListSchema);
export default WishList;
