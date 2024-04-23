import User from '../models/user.model.js';


export default async function signUpResolver(parent, args){
    try{
        if (!args.email || !args.password || !args.name){
            throw new Error('Please provide email, name, and password'); // error if no email, name, or password provided
        }
        // find the user with the given email for error checking
        const user = await User.findOne({email: args.email});
        if(user){
            throw new Error('User already exists');
        }
        // create a new user with the given fields
        const newUser = new User({
            name: args.name,
            email: args.email,
            password: args.password,
            dateCreated: new Date(),
            totalListings: 0,
            itemsSold: 0,
            itemsBought: 0,
            avgRating: 0,
            aboutMe: '',
        });
        await newUser.save(); // save the new user to the database
        return { // return the user's name and email
            name: newUser.name,
            email: newUser.email
        }
    } catch (err) {
        console.log("Error in resolver", err);  // Log any errors
        throw new Error(err.message);
    }
}
