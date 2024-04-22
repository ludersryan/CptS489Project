
import User from '../models/user.model.js';
import { verifyToken } from '../helpers/jwt.js';

export default async function updateUserResolver(parent, args, context){
    try{
        const user = await verifyToken(context.req.headers['authorization']);

        let updateUserFields = {};
        if (args.name !== undefined) updateUserFields.name = args.name;
        if (args.email !== undefined) updateUserFields.email = args.email;
        if (args.password !== undefined) updateUserFields.password = args.password;
        if (args.aboutMe !== undefined) updateUserFields.aboutMe = args.aboutMe;
        if (args.totalListings !== undefined) updateUserFields.totalListings = args.totalListings;
        if (args.itemsSold !== undefined) updateUserFields.itemsSold = args.itemsSold;
        if (args.itemsBought !== undefined) updateUserFields.itemsBought = args.itemsBought;
        if (args.avgRating !== undefined) updateUserFields.avgRating = args.avgRating;

        if (Object.keys(updateUserFields).length === 0){
            throw new Error('No fields to update');
        }
        else{
            return User.findByIdAndUpdate(user.id, {$set: updateUserFields}, {new: true});
        }
        
    }
    catch(err){
        throw new Error(err.message);
    }
};