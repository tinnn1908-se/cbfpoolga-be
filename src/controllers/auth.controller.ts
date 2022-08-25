import { Request, Response } from "express";
import MyHelper from "../helper";
import AuthMiddleWare from "../middleware/auth.middleware";
import { User } from "../model";
import UserQuery from "../queries/user.queries";

export default class AuthController {
    static async register(request: Request, response: Response) {
        var username = request.body.username;
        var password = request.body.password;
        var email = request.body.email;
        // check isExisted
        var id = MyHelper.generateID();
        var created_date = MyHelper.getCurrentDateTime();
        var user: User = { id, username, password, email, created_date, is_activated: false, is_deleted: false };
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
        console.log('verifyEmail')
        if (token) return response.status(200).json(`token : ${token}`)
        return response.status(404).json('Failed Verified')
    }
}