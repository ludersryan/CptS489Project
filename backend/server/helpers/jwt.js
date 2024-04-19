import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { private_key, public_key } from './key.js';


dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, public_key, (err, decoded) => {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userId = decoded.id;
        next();
    });
}

export const generateToken = (user) => {
    return jwt.sign({ id: user.id, name: user.name }, private_key, {
        algorithm: 'RS256',
        expiresIn: 86400 // expires in 24 hours
    });
}

