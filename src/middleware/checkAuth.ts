import { IUser } from '../models/User';
import express from 'express';
import { verifyJWTToken } from '../helpers';


export default (req: any, res: any, next: any) => {
    const token = req.headers.token;

    verifyJWTToken(token)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(() => {
            res.status(403).json({ message: "Invalid auth token provided." });
        })
    next();
}