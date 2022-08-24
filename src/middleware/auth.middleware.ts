import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User } from "../model";
dotenv.config();
export default class AuthMiddleWare {
    static authenToken(request: Request, response: Response, next: NextFunction) {
        const authorizationHeader: string = request.headers['authorization'] !== undefined ? request.headers['authorization'] : '';
        const token = authorizationHeader.split(' ')[1];
        console.log('token : ' + token);
        if (!token) {
            const secretKey = process.env.ACCESS_TOKEN_SECRET;
            if (secretKey) {
                jwt.verify(token, secretKey, (err, data) => {
                    if (err) response.sendStatus(401);
                    next();
                })
            }
        }
    }
    static generateToken(user: User) {
        var secretKey = process.env.ACCESS_TOKEN_SECRET;
        var accessToken = '';
        if (secretKey) {
            accessToken = jwt.sign({ user }, secretKey, {
                expiresIn: '3600s'
            })
        }
        return accessToken;
    }
    static generateRefreshToken(username: string, password: string): string {
        var secretKey = process.env.REFRESH_TOKEN_SECRET;
        var refreshToken = '';
        if (secretKey) {
            refreshToken = jwt.sign({ username, password }, secretKey, { expiresIn: '25200s', algorithm: 'HS256' });
        }
        return refreshToken;
    }
    static getUserbyToken(token: string): User | null {
        var decodedToken = jwt.decode(token);
        if (decodedToken && typeof decodedToken === 'object') {
            var user: User = Object.values(decodedToken)[0];
            return user;
        }
        return null;
    }
}