import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { private_key, public_key } from './key.js';
import User from '../models/user.model.js';


dotenv.config();


export const verifyToken = (token) => {
    if (!token) {
        throw new Error('No token provided');
    }
    const bearerToken = token.split(' ')[1]; // split token from Bearer
    if(!bearerToken){
        throw new Error('Invalid token format');
    }
    try{
        const authData = jwt.verify(bearerToken, public_key); // verify JWT w/ public key
        const user = User.findById(authData.id).exec();  // find the user in db by Id
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
    catch(err){
        throw new Error(err.message);
    }
};

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, private_key, {
        algorithm: 'RS256',
        expiresIn: 86400 // expires in 24 hours
    });
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, private_key, {
        algorithm: 'RS256',
        expiresIn: 2592000 // expires in 30 days
    });
}
