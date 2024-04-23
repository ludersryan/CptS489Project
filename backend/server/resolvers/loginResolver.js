import { generateAccessToken } from '../helpers/jwt.js'
import User from '../models/user.model.js'

export default async function loginResolver(parent, args){
    try{
        if (!args.email || !args.password){
            throw new Error('Please provide email and password'); // checking for email and password
        }
        const user = await User.findOne({email: args.email}); // finding user by email
        if(!user){
            throw new Error('User not found');
        }
        
        const isPasswordValid = await user.validatePassword(args.password); // validating password
        if(!isPasswordValid){
            throw new Error('Invalid password');
        }
        
        const token = generateAccessToken(user); // creating access token for accessing login view
        return {
            token: token,
            id: user._id.toString()
        };
    }catch(err){
        throw new Error(err.message);
    }
}