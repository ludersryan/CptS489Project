import User from '../models/user.model.js';

export default async function signUpResolver(parent, args){
    try{
        if (!args.email || !args.password || !args.name){
            throw new Error('Please provide email, name, and password');
        }
        const user = await User.findOne({email: args.email});
        if(user){
            throw new Error('User already exists');
        }
        const newUser = new User({
            name: args.name,
            email: args.email,
            password: args.password,
            dateCreated: new Date()
        });
        await newUser.save();
        return {
            name: newUser.name,
            email: newUser.email
        }
    } catch (err) {
        console.log("Error in resolver", err);  // Log any errors
        throw new Error(err.message);
    }
}
