import WishList from "../models/wishlist.model.js";
import { verifyToken } from '../helpers/jwt.js';
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

export async function addToWishListResolver(parent, args, context){
    try{
        console.log(context.req.headers['authorization']);
        const token = await verifyToken(context.req.headers['authorization']);
        const userId = context.req.headers['userid'];

        if(!token){
            throw new Error('Unauthorized');
        }
        if(User.findById(userId) === null || User.findById(userId) === undefined){
            throw new Error('User not found');
        }
        if(Post.findById(args.postId) === null || Post.findById(args.postId) === undefined){
            throw new Error('Post not found');
        }

        
        const newWishList = new WishList({
            userId: userId,
            postId: args.postId,
        });
        await newWishList.save();
        return {
            userId: newWishList.userId,
            postId: newWishList.postId,
        }
    }
    catch(err){
        throw new Error(err.message);
    }
}

export async function removeFromWishListResolver(parent, args, context){
    try{
        console.log(context.req.headers['authorization']);
        const user = await verifyToken(context.req.headers['authorization']);
        
        const result = await WishList.deleteOne({ userId: user.id, postId: args.postId })
        if(result.deletedCount === 0){
            throw new Error('WishList not found');
        }
        return {
            userId: user.id,
            productId: args.postId,
        }
    }
    catch(err){
        throw new Error(err.message);
    }
}

