import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { private_key, public_key } from './key.js';
import User from '../models/user.model.js';


dotenv.config();


export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        if (!token) {
            reject(new Error('No token provided') );
        }
        const bearerToken = token.split(' ')[1];
        jwt.verify(bearerToken, public_key, async (err, authData) => {
            if (err) {
                reject( new Error('Invalid token') );
            }
            else{
                const user = User.findById(authData.id);
                if (!user) {
                    reject(new Error('User not found'));
                }
                else {
                    resolve(user);
                }
            }
        });
    });
};

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, private_key, {
        algorithm: 'RS256',
        expiresIn: 86400 // expires in 24 hours
    });
}

