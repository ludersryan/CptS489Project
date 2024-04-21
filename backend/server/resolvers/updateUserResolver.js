
import User from '../models/user.model.js';
import { verifyToken } from '../helpers/jwt.js';
import bcrypt from 'bcrypt';

export default async function updateUserResolver(parent, args, context){
    try{
        const user = await verifyToken(context.req.headers['authorization']);
        return User.findByIdAndUpdate(
            user.id,
            {
                $set: {
                    name: args.name,
                    email: args.email,
                    password: await bcrypt.hash(args.password, 10),
                },
            },
            { new : true }

        );
    }
    catch(err){
        throw new Error(err.message);
    }
};