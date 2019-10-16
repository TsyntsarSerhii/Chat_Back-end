import { IUser } from '../models/User';
import express from 'express';
import { verifyJWTToken } from '../helpers';


export default (req: any, res: any, next: any) => {
    if (req.path === "/user/login" || req.path === '/user/registration') {
        return next();
    }
    const token = req.headers.token;

    verifyJWTToken(token)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(err => {
            res.status(403).json({ message: "Invalid auth token provided." });
        })
}