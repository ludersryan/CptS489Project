import Post from '../models/post.model.js';
import { verifyToken } from '../helpers/jwt.js';

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
        return Post.findByIdAndUpdate(
            args.id,
            {
                $set: {
                    name: args.name,
                    description: args.description,
                    condition: args.condition,
                    price: args.price,
                    favorites: args.favorites,
                    brand: args.brand,
                    yearProduced: args.yearProduced,
                },
            },
            { new : true }
        );
    }
    catch(err){
        throw new Error(err.message);
    }
};

export async function addPostResolver(parent, args, context){
    try{
        console.log(context.req.headers['authorization']);
        const user = await verifyToken(context.req.headers['authorization']);
        const newPost = new Post({
            name: args.name,
            brand: args.brand,
            yearProduced: args.yearProduced,
            description: args.description,
            condition: args.condition,
            favorites: args.favorites || 0,
            price: args.price,
            userId: user.id,
        });
        await newPost.save();
        return newPost;
    }
    catch(err){
        throw new Error(err.message);
    }
}