import { Request, Response } from "express";
import MyHelper from "../helper";
import AuthMiddleWare from "../middleware/auth.middleware";
import { User } from "../model";
import UserQuery from "../queries/user.queries";
import bcrypt from 'bcryptjs'

export default class AuthController {
    static async register(request: Request, response: Response) {
        var username = request.body.username;
        var password = request.body.password;
        var email = request.body.email;
        // check isExisted
        var id = MyHelper.generateID();
        var created_date = MyHelper.getCurrentDateTime();
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        var user: User = { id, username, password: hashPassword, email, created_date, is_activated: false, is_deleted: false };
        console.log("user : " + Object.values(user));
        var isCreated = false;
        var isExistedUsername = await UserQuery.isExistedUsername(username);
        var isExistedEmail = await UserQuery.isExistedEmail(email);
        var token = AuthMiddleWare.generateToken(user);
        if (!isExistedEmail && !isExistedUsername && token.length > 0) {
            isCreated = await UserQuery.createUser(user);
        }
        if (isCreated) return response.status(200).json({
            "access_token": `${token}`
        });
        return response.status(304).json('Create User Failed !')
    }
    static async verifyEmail(request: Request, response: Response) {
        var token = request.params.token;
        var isActivated = false;
        if (token) {
            var user: User | null = await AuthMiddleWare.getUserbyToken(token);
            console.log("user by token : " + user);
            if (user !== null) {
                isActivated = await UserQuery.activateUser(user.id);
                console.log("isActivated : " + isActivated);
                if (isActivated) return response.status(200).json(`token : ${token}`)
            }
        }
        return response.status(404).json('Failed Verified')
    }
    static async authenticate(request: Request, response: Response) {
        console.log('authenticate')
        try {
            var username = request.body.username;
            var email = request.body.email;
            var password = request.body.password;

            var tokens: {
                access_token: string,
                refresh_token: string
            } = {
                access_token: '', refresh_token: ''
            }
            var user: User | null = null;
            console.log('username : ' + username)
            console.log('email : ' + email)
            console.log('password : ' + password)
            if (username.length > 0) {
                console.log('username.length > 0')
                user = await UserQuery.getUserByUsername(username);
            } else if (email.length > 0) {
                console.log('email.length > 0')
                user = await UserQuery.getUserByEmail(email);
            }
            console.log("authenticate : " + user)

            if (user) {
                var isCorrectPassword = await bcrypt.compare(password, user.password);
                console.log("password : " + password)
                console.log("user password : " + user.password)
                console.log("isCorrectPassword : " + isCorrectPassword)
                if (isCorrectPassword) {
                    tokens.access_token = AuthMiddleWare.generateToken(user);
                    tokens.refresh_token = AuthMiddleWare.generateRefreshToken(user.username, user.password);
                }
            }
            if (tokens.access_token.length > 0 && tokens.refresh_token.length > 0)
                return response.status(200).json({ tokens })
            return response.status(404).json({
                status: 404,
                msgErr: "User not found !"
            })
        } catch (error) {
            return response.status(404).json({
                status: 404,
                msgErr: "User not found !"
            })
        }
    }
    static async authorize(request: Request, response: Response) {
        console.log('authorize')
        try {
            var tokens: {
                access_token: string,
                refresh_token: string
            } = {
                access_token: request.body.access_token,
                refresh_token: request.body.refresh_token
            }
            console.log("authorize : " + tokens.access_token)
            if (tokens && tokens.access_token.length > 0) {
                var user: User | null = AuthMiddleWare.getUserbyToken(tokens.access_token);
                console.log("user : " + typeof user + " - " + user);
                if (user) {
                    return response.status(200).json({ user })
                }
                return response.status(404).json({
                    msgErr: "Authorize Failed !"
                })
            }
            return response.status(404).json({
                msgErr: "Authorize Failed !"
            })
        } catch (error) {
            return response.status(404).json({
                msgErr: "Authorize Failed !"
            })
        }
    }

}