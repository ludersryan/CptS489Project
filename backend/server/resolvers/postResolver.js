import Post from '../models/post.model.js';
import { verifyToken } from '../helpers/jwt.js';
import User from '../models/user.model.js';

export async function updatePostResolver(parent, args, context){
    try{
        console.log(context.req.headers['authorization']);
        const user = await verifyToken(context.req.headers['authorization']);

        const post = await Post.findById(args.id);
        if(!post){
            throw new Error('Post not found');
        }
        if(post.userId.toString() !== user.id){
            throw new Error('Unauthorized');
        }

        let updatePostFields = {};
        if (args.name !== undefined) updatePostFields.name = args.name;
        if (args.description !== undefined) updatePostFields.description = args.description;
        if (args.condition !== undefined) updatePostFields.condition = args.condition;
        if (args.price !== undefined) updatePostFields.price = args.price;
        if (args.favorites !== undefined) updatePostFields.favorites = args.favorites;
        if (args.brand !== undefined) updatePostFields.brand = args.brand;
        if (args.yearProduced !== undefined) updatePostFields.yearProduced = args.yearProduced;

        if (Object.keys(updatePostFields).length === 0){
            throw new Error('No fields to update');
        }
        else{
            return Post.findByIdAndUpdate(args.id, {$set: updatePostFields}, {new: true});
        }
    }
    catch(err){
        throw new Error(err.message);
    }
};

export async function addPostResolver(parent, args, context){
    try{
        console.log(context.req.headers['authorization']);
        const token = await verifyToken(context.req.headers['authorization']);
        const userId = context.req.headers['userId'];

        if(!token){
            throw new Error('Unauthorized');
        }

        if(User.findById(userId) === null || User.findById(userId) === undefined){
            throw new Error('User not found');
        }
        
        let newPostFields = {};
        if (!args.name || !args.brand || !args.price){
            throw new Error('Please provide name, brand, and price');
        }
        

        if (args.price < 0){
            throw new Error('Price cannot be negative');
        }

        // check the date is in the correct format
        if (args.yearProduced !== undefined){
            if (args.yearProduced < 0){
                throw new Error('Year produced cannot be negative');
            }
        }

        newPostFields.name = args.name;
        newPostFields.brand = args.brand;
        newPostFields.price = args.price;
        if (args.yearProduced !== undefined) newPostFields.yearProduced = args.yearProduced;
        if (args.description !== undefined) newPostFields.description = args.description;
        if (args.condition !== undefined) newPostFields.condition = args.condition;

        const newPost = new Post(newPostFields);
        await newPost.save();
        return newPost;
    }
    catch(err){
        throw new Error(err.message);
    }
}